import http from "node:http";
import crypto from "node:crypto";
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const root = path.dirname(fileURLToPath(import.meta.url));
try {
  const envText = await readFile(path.join(root, ".env"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
  }
} catch { /* Production hosts usually provide environment variables directly. */ }

const port = Number(process.env.PORT || 3000);
const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
const adminPassword = process.env.ADMIN_PASSWORD || "protecta2026";
const maxBodyBytes = 128 * 1024;            // Gemini
const maxUploadBodyBytes = 8 * 1024 * 1024; // productos con imagen (base64)
const maxImageBytes = 5 * 1024 * 1024;
const uploadsDir = path.join(root, "uploads");
await mkdir(uploadsDir, { recursive: true });

const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp"
};
const imageTypes = { "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif" };

const requestCounts = new Map();
const loginAttempts = new Map();
const sessions = new Map(); // token -> expira (ms)
const SESSION_MS = 8 * 60 * 60 * 1000;
let dbPool = null;
let schemaReady = null;

/* ---------------- Base de datos ---------------- */
function getDatabase() {
  // Por defecto base protecta (XAMPP) aunque no haya .env
  if (!dbPool) {
    dbPool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "protecta",
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4"
    });
  }
  return dbPool;
}

// Agrega la columna `imagen` a la tabla productos solo si todavía no existe.
function ensureSchema(pool) {
  if (!schemaReady) {
    schemaReady = (async () => {
      const [cols] = await pool.query(
        "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'productos' AND COLUMN_NAME = 'imagen'"
      );
      if (!cols.length) await pool.query("ALTER TABLE productos ADD COLUMN imagen VARCHAR(255) NULL");
    })().catch((error) => { schemaReady = null; throw error; });
  }
  return schemaReady;
}

/* ---------------- Utilidades ---------------- */
function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function readJson(req, limit = maxBodyBytes) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error("Request too large"), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw Object.assign(new Error("Invalid JSON"), { status: 400 }); }
}

function clientId(req) {
  return (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function tooMany(map, key, max, windowMs) {
  const now = Date.now();
  const recent = (map.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= max) { map.set(key, recent); return true; }
  recent.push(now);
  map.set(key, recent);
  return false;
}

function isAdmin(req) {
  const token = req.headers["x-admin-token"];
  if (!token) return false;
  const expires = sessions.get(token);
  if (!expires) return false;
  if (expires < Date.now()) { sessions.delete(token); return false; }
  return true;
}

function sameText(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function cleanText(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

// Guarda una imagen (data URL base64) en /uploads y devuelve la ruta relativa: "uploads/xxxx.jpg"
async function saveImage(dataUrl) {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
    throw Object.assign(new Error("Imagen inválida"), { status: 400 });
  }
  const comma = dataUrl.indexOf(",");
  const header = dataUrl.slice(5, comma); // image/png;base64
  const [mime, encoding] = header.split(";");
  const ext = imageTypes[mime];
  if (!ext || encoding !== "base64") {
    throw Object.assign(new Error("Solo se permiten imágenes PNG, JPG, WEBP o GIF"), { status: 400 });
  }
  const buffer = Buffer.from(dataUrl.slice(comma + 1), "base64");
  if (!buffer.length || buffer.length > maxImageBytes) {
    throw Object.assign(new Error("La imagen debe pesar menos de 5 MB"), { status: 413 });
  }
  const name = crypto.randomUUID() + ext;
  await writeFile(path.join(uploadsDir, name), buffer);
  return "uploads/" + name;
}

async function removeImageFile(relPath) {
  if (typeof relPath !== "string" || !relPath.startsWith("uploads/")) return;
  const target = path.resolve(root, relPath);
  if (!target.startsWith(uploadsDir + path.sep)) return;
  try { await unlink(target); } catch { /* ya no existe */ }
}

function handleError(res, error, fallback) {
  const status = error.status || 500;
  if (!error.status) console.error("[Protecta DB]", fallback, error.message);
  return send(res, status, { error: error.status ? error.message : fallback });
}

/* ---------------- Servidor ---------------- */

async function handleLogin(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }
  if (req.method !== "POST") return send(res, 405, { ok: false, error: "Method not allowed" });

  try {
    const body = await readJson(req);
    const password = String(body.password || body["contraseña"] || "").trim();
    if (!password) return send(res, 400, { ok: false, error: "Contraseña vacía" });

    const pool = getDatabase();
    if (!pool) return send(res, 503, { ok: false, error: "Sin conexión a MySQL" });

    // Tabla `contraseña` campo `contraseña` (también prueba sin ñ)
    const tries = [
      ["SELECT 1 AS ok FROM `contraseña` WHERE `contraseña` = ? LIMIT 1", [password]],
      ["SELECT 1 AS ok FROM `contrasena` WHERE `contrasena` = ? LIMIT 1", [password]],
      ["SELECT 1 AS ok FROM `contraseña` WHERE `contrasena` = ? LIMIT 1", [password]],
    ];
    let matched = false;
    for (const [sql, params] of tries) {
      try {
        const [rows] = await pool.query(sql, params);
        if (rows && rows.length) {
          matched = true;
          break;
        }
      } catch {
        /* tabla/columna no existe con ese nombre */
      }
    }

    if (!matched) {
      // Leer filas y comparar cualquier columna
      for (const table of ["contraseña", "contrasena"]) {
        try {
          const [rows] = await pool.query(`SELECT * FROM \`${table}\` LIMIT 50`);
          for (const row of rows) {
            if (Object.values(row).some((v) => String(v) === password)) {
              matched = true;
              break;
            }
          }
        } catch {
          /* ignore */
        }
        if (matched) break;
      }
    }

    if (!matched) return send(res, 401, { ok: false, error: "Clave incorrecta" });

    const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString("hex");
    return send(res, 200, { ok: true, token, mensaje: "Acceso concedido" });
  } catch (error) {
    console.error("[Protecta Login]", error);
    return send(res, 500, { ok: false, error: error.message || "Error de login" });
  }
}


const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  /* ----- Login de empresa ----- */
  if (url.pathname === "/api/login") {
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
    if (tooMany(loginAttempts, clientId(req), 10, 10 * 60 * 1000)) {
      return send(res, 429, { error: "Demasiados intentos; espera unos minutos" });
    }
    try {
      const body = await readJson(req);
      if (!sameText(body.password ?? "", adminPassword)) return send(res, 401, { error: "Clave incorrecta" });
      const token = crypto.randomBytes(24).toString("hex");
      sessions.set(token, Date.now() + SESSION_MS);
      return send(res, 200, { token });
    } catch (error) {
      return handleError(res, error, "No se pudo iniciar sesión");
    }
  }

  /* ----- Productos: leer (público) ----- */
  if (url.pathname === "/api/productos" && req.method === "GET") {
    const pool = getDatabase();
    if (!pool) return send(res, 503, { error: "Configura la conexión a la base de datos en .env" });
    try {
      await ensureSchema(pool);
      let rows;
      try {
        [rows] = await pool.query(
          "SELECT id_producto AS id, nombre, descripcion, categoria, imagen FROM productos ORDER BY categoria, id_producto"
        );
      } catch (e) {
        [rows] = await pool.query(
          "SELECT id, nombre, descripcion, categoria, imagen FROM productos ORDER BY categoria, id"
        );
      }
      return send(res, 200, { ok: true, productos: rows });
    } catch (error) {
      return handleError(res, error, "No se pudo consultar la tabla productos de la base protecta");
    }
  }

  /* ----- Productos / categorías: escribir (solo empresa) ----- */
  const isProductWrite = /^\/api\/productos(\/\d+)?$/.test(url.pathname) && ["POST", "PUT", "DELETE"].includes(req.method);
  const isCategoryWrite = (url.pathname === "/api/categorias/renombrar" || url.pathname === "/api/categorias/eliminar") && req.method === "POST";

  if (isProductWrite || isCategoryWrite) {
    if (!isAdmin(req)) return send(res, 401, { error: "Sesión de empresa expirada. Vuelve a iniciar sesión." });
    const pool = getDatabase();
    if (!pool) return send(res, 503, { error: "Configura la conexión a la base de datos en .env" });

    try {
      await ensureSchema(pool);
      const idMatch = url.pathname.match(/^\/api\/productos\/(\d+)$/);
      const id = idMatch ? Number(idMatch[1]) : null;

      // Crear producto
      if (req.method === "POST" && url.pathname === "/api/productos") {
        const body = await readJson(req, maxUploadBodyBytes);
        const nombre = cleanText(body.nombre, 255);
        const descripcion = cleanText(body.descripcion, 1000);
        const categoria = cleanText(body.categoria, 100);
        if (!nombre || !categoria) return send(res, 400, { error: "Nombre y categoría son obligatorios" });
        const imagen = body.imagenData ? await saveImage(body.imagenData) : null;
        try {
          const [result] = await pool.query(
            "INSERT INTO productos (nombre, descripcion, categoria, imagen) VALUES (?, ?, ?, ?)",
            [nombre, descripcion, categoria, imagen]
          );
          return send(res, 201, { id: result.insertId, imagen });
        } catch (error) {
          await removeImageFile(imagen);
          throw error;
        }
      }

      // Editar producto
      if (req.method === "PUT" && id) {
        const body = await readJson(req, maxUploadBodyBytes);
        const [found] = await pool.query("SELECT nombre, descripcion, categoria, imagen FROM productos WHERE id_producto = ?", [id]);
        if (!found.length) return send(res, 404, { error: "Producto no encontrado" });
        const current = found[0];
        const nombre = body.nombre !== undefined ? cleanText(body.nombre, 255) : current.nombre;
        const descripcion = body.descripcion !== undefined ? cleanText(body.descripcion, 1000) : current.descripcion;
        const categoria = body.categoria !== undefined ? cleanText(body.categoria, 100) : current.categoria;
        if (!nombre || !categoria) return send(res, 400, { error: "Nombre y categoría son obligatorios" });
        let imagen = current.imagen;
        let newImage = null;
        if (body.imagenData) { newImage = await saveImage(body.imagenData); imagen = newImage; }
        try {
          await pool.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, categoria = ?, imagen = ? WHERE id_producto = ?",
            [nombre, descripcion, categoria, imagen, id]
          );
        } catch (error) {
          await removeImageFile(newImage);
          throw error;
        }
        if (newImage) await removeImageFile(current.imagen);
        return send(res, 200, { id, imagen });
      }

      // Borrar producto
      if (req.method === "DELETE" && id) {
        const [found] = await pool.query("SELECT imagen FROM productos WHERE id_producto = ?", [id]);
        await pool.query("DELETE FROM productos WHERE id_producto = ?", [id]);
        if (found.length) await removeImageFile(found[0].imagen);
        return send(res, 200, { ok: true });
      }

      // Renombrar catálogo (categoría)
      if (url.pathname === "/api/categorias/renombrar") {
        const body = await readJson(req);
        const actual = cleanText(body.actual, 100);
        const nuevo = cleanText(body.nuevo, 100);
        if (!actual || !nuevo) return send(res, 400, { error: "Faltan nombres de catálogo" });
        await pool.query("UPDATE productos SET categoria = ? WHERE categoria = ?", [nuevo, actual]);
        return send(res, 200, { ok: true });
      }

      // Eliminar catálogo completo
      if (url.pathname === "/api/categorias/eliminar") {
        const body = await readJson(req);
        const nombre = cleanText(body.nombre, 100);
        if (!nombre) return send(res, 400, { error: "Falta el nombre del catálogo" });
        const [images] = await pool.query("SELECT imagen FROM productos WHERE categoria = ?", [nombre]);
        await pool.query("DELETE FROM productos WHERE categoria = ?", [nombre]);
        for (const row of images) await removeImageFile(row.imagen);
        return send(res, 200, { ok: true });
      }

      return send(res, 405, { error: "Method not allowed" });
    } catch (error) {
      return handleError(res, error, "No se pudo guardar en la base de datos");
    }
  }

    if (
    url.pathname === "/api/login" ||
    url.pathname === "/api/login.php"
  ) {
    return handleLogin(req, res);
  }

if (url.pathname === "/api/productos") return send(res, 405, { error: "Method not allowed" });

  /* ----- Gemini ----- */
  if (url.pathname === "/api/gemini") {
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
    if (!apiKey) return send(res, 503, { error: "Gemini is not configured on the server" });
    if (!req.headers["content-type"]?.toLowerCase().includes("application/json")) {
      return send(res, 415, { error: "Expected application/json" });
    }
    if (tooMany(requestCounts, clientId(req), 30, 10 * 60 * 1000)) {
      return send(res, 429, { error: "Too many requests; try again later" });
    }

    try {
      const payload = await readJson(req);
      if (!payload.request || typeof payload.request !== "object" || !Array.isArray(payload.request.contents)) {
        return send(res, 400, { error: "Invalid Gemini request" });
      }
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify(payload.request),
          signal: AbortSignal.timeout(20000)
        }
      );
      const responseText = await upstream.text();
      if (!upstream.ok) {
        console.error(`[Protecta IA] Gemini respondió HTTP ${upstream.status}`);
        return send(res, upstream.status, { error: "Gemini request failed" });
      }
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      return res.end(responseText);
    } catch (error) {
      const status = error.status || (error.name === "TimeoutError" ? 504 : 502);
      if (!error.status) console.error("[Protecta IA] Error de conexión con Gemini:", error.message);
      return send(res, status, { error: error.status ? error.message : "Gemini is temporarily unavailable" });
    }
  }

  /* ----- Archivos estáticos ----- */
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, { error: "Method not allowed" });
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { return send(res, 400, { error: "Invalid path" }); }
  if (pathname === "/") pathname = "/index.html";
  if (pathname.split("/").some((part) => part.startsWith(".")) || pathname === "/server.mjs") {
    return send(res, 404, { error: "Not found" });
  }
  const target = path.resolve(root, `.${pathname}`);
  if (target !== root && !target.startsWith(root + path.sep)) return send(res, 403, { error: "Forbidden" });
  try {
    const content = await readFile(target);
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    });
    return res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    return send(res, 404, { error: "Not found" });
  }
});

server.listen(port, "0.0.0.0", () => console.log(`Protecta listo en http://localhost:${port}`));
