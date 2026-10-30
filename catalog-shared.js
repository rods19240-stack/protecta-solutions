/**
 * Protecta — catálogo compartido (Empresa + Clientes)
 * Todo viene de MySQL (tabla `productos`, base `protecta`) a través del servidor:
 *   GET    /api/productos                 -> leer (clientes y empresa)
 *   POST   /api/productos                 -> crear      (solo empresa)
 *   PUT    /api/productos/:id             -> editar     (solo empresa)
 *   DELETE /api/productos/:id             -> borrar     (solo empresa)
 *   POST   /api/categorias/renombrar      -> renombrar catálogo
 *   POST   /api/categorias/eliminar       -> borrar catálogo completo
 *
 * Un "catálogo" es la columna `categoria`. Las imágenes se suben al servidor
 * (carpeta /uploads) y en la base se guarda su ruta, p. ej. "uploads/abc.jpg".
 *
 * Las funciones de escritura actualizan la pantalla de inmediato y guardan en
 * la base en segundo plano; al terminar se vuelve a leer la base.
 */
(function (global) {
    "use strict";

    var OLD_STORAGE_KEY = "protectaProductData_v4";
    var TOKEN_KEY = "protectaEmpresaToken";

    /** Node :3000 → /api/productos | Apache/XAMPP → api/productos.php */
    function apiBase() {
        var port = String(location.port || "");
        if (port === "3000" || port === "5173" || port === "8080") return "/api/productos";
        // relative to current folder (http://localhost/protecta/...)
        return "api/productos.php";
    }

    try { localStorage.removeItem(OLD_STORAGE_KEY); } catch (e) {}

    var rows = [];        // filas de la tabla productos: {id, nombre, descripcion, categoria, imagen}
    var pending = [];     // catálogos nuevos que aún no tienen productos
    var inflight = 0;
    var chain = Promise.resolve();
    var tempId = 0;
    var lastError = "";

    /* ---------------- utilidades ---------------- */
    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function getLang() {
        try { return localStorage.getItem("protectaLanguage") || "es"; } catch (e) { return "es"; }
    }

    function slugify(name) {
        return String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "CAT";
    }

    function guessFilter(name) {
        var n = String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (/fibra|red\b|redes|network|switch|cableado/.test(n)) return "network";
        if (/alarm|acceso|incendio|video|vigil|camara|pci|seguridad|cerco|sensor/.test(n)) return "security";
        return "technology";
    }

    function catName(row) {
        return String(row.categoria || "").trim() || "Sin categoría";
    }

    /* ---------------- datos -> catálogos ---------------- */
    function build() {
        var map = new Map();
        rows.forEach(function (r) {
            var n = catName(r);
            if (!map.has(n)) map.set(n, []);
            map.get(n).push(r);
        });
        pending.forEach(function (n) { if (!map.has(n)) map.set(n, []); });

        var used = {};
        var out = [];
        map.forEach(function (list, name) {
            var slug = slugify(name);
            var code = "DB-" + slug;
            var k = 2;
            while (used[code]) code = "DB-" + slug + "-" + (k++);
            used[code] = 1;
            var withImg = list.filter(function (r) { return r.imagen; })[0];
            out.push({
                code: code,
                name: name,
                filter: guessFilter(name),
                label: slug.slice(0, 12),
                categoryLabel: name.toUpperCase(),
                title: name,
                titleEn: name,
                desc: "Catálogo de " + name + ".",
                descEn: "Catalog: " + name + ".",
                image: withImg ? String(withImg.imagen) : null,
                noScan: false,
                items: list.map(function (r) {
                    return [String(r.nombre || ""), String(r.descripcion || ""), r.imagen ? String(r.imagen) : "", r.id];
                })
            });
        });
        return out;
    }

    function load() { return build(); }
    function getByCode(code) {
        return build().filter(function (c) { return c.code === code; })[0] || null;
    }
    function save() { return true; } // compatibilidad: ya no se guarda en el navegador

    /* ---------------- API ---------------- */
    function api(method, url, body) {
        var headers = { "Content-Type": "application/json" };
        var token = "";
        try { token = sessionStorage.getItem(TOKEN_KEY) || ""; } catch (e) {}
        if (token) headers["x-admin-token"] = token;
        return fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (json) {
                if (!res.ok) {
                    var err = new Error(json.error || ("HTTP " + res.status));
                    err.status = res.status;
                    throw err;
                }
                return json;
            });
        });
    }

    function handleError(err) {
        console.error("[Protecta] Error al guardar en MySQL:", err);
        if (err && err.status === 401) {
            try {
                sessionStorage.removeItem("protectaEmpresaAuth");
                sessionStorage.removeItem(TOKEN_KEY);
            } catch (e) {}
            alert("Tu sesión de empresa expiró. Vuelve a iniciar sesión.");
            location.href = "index.html";
            return;
        }
        alert("No se pudo guardar en la base de datos: " + ((err && err.message) || "error desconocido"));
    }

    function enqueue(task) {
        inflight++;
        chain = chain.then(task).catch(handleError).then(function () {
            inflight--;
            if (inflight === 0) return syncFromDatabase({ silent: true });
        });
    }

    function findRow(id) {
        return rows.filter(function (r) { return r.id === id; })[0] || null;
    }

    /* ---------------- escritura ---------------- */
    function addCategory(cat) {
        var name = String((cat && cat.title) || "").trim();
        if (!name) return false;
        var exists = build().some(function (c) { return c.name.toLowerCase() === name.toLowerCase(); });
        if (exists) return false;
        pending.push(name);
        return true;
    }

    function updateCategory(code, patch) {
        var cat = getByCode(code);
        if (!cat) return false;
        var newName = String((patch && patch.title) || "").trim();
        if (!newName || newName === cat.name) return true;
        var old = cat.name;
        rows.forEach(function (r) { if (catName(r) === old) r.categoria = newName; });
        pending = pending.map(function (n) { return n === old ? newName : n; });
        if (cat.items.length) {
            enqueue(function () { return api("POST", "/api/categorias/renombrar", { actual: old, nuevo: newName }); });
        }
        return true;
    }

    function deleteCategory(code) {
        var cat = getByCode(code);
        if (!cat) return false;
        var name = cat.name;
        var hadRows = cat.items.length > 0;
        rows = rows.filter(function (r) { return catName(r) !== name; });
        pending = pending.filter(function (n) { return n !== name; });
        if (hadRows) {
            enqueue(function () { return api("POST", "/api/categorias/eliminar", { nombre: name }); });
        }
        return true;
    }

    /** image: data URL (nueva imagen) o vacío para no cambiarla */
    function addItem(code, name, desc, image) {
        var cat = getByCode(code);
        name = String(name || "").trim();
        if (!cat || !name) return false;
        var row = {
            id: --tempId,
            nombre: name,
            descripcion: String(desc || ""),
            categoria: cat.name,
            imagen: image || null
        };
        rows.push(row);
        pending = pending.filter(function (n) { return n !== cat.name; });
        enqueue(function () {
            return api("POST", apiBase(), {
                nombre: row.nombre,
                descripcion: row.descripcion,
                categoria: row.categoria,
                imagenData: image || undefined
            }).then(function (res) {
                row.id = res.id;
                row.imagen = res.imagen || null;
            });
        });
        return true;
    }

    function updateItem(code, itemIndex, name, desc, image) {
        var cat = getByCode(code);
        if (!cat || !cat.items[itemIndex]) return false;
        var row = findRow(cat.items[itemIndex][3]);
        name = String(name || "").trim();
        if (!row || !name) return false;
        row.nombre = name;
        row.descripcion = String(desc || "");
        var body = { nombre: row.nombre, descripcion: row.descripcion };
        if (typeof image === "string" && image) {
            row.imagen = image;
            body.imagenData = image;
        }
        enqueue(function () {
            if (row.id < 0) return null;
            var base = apiBase();
            var method, url, payload;
            if (base.indexOf(".php") >= 0) {
                method = "POST";
                url = base + "?action=update&id=" + encodeURIComponent(row.id);
                payload = {
                    action: "update",
                    id: row.id,
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    categoria: row.categoria,
                    imagenData: body.imagenData
                };
            } else {
                method = "PUT";
                url = "/api/productos/" + row.id;
                payload = body;
            }
            return api(method, url, payload).then(function (res) {
                if (res && res.imagen) row.imagen = res.imagen;
            });
        });
        return true;
    }

    function deleteItem(code, itemIndex) {
        var cat = getByCode(code);
        if (!cat || !cat.items[itemIndex]) return false;
        var row = findRow(cat.items[itemIndex][3]);
        if (!row) return false;
        rows = rows.filter(function (r) { return r !== row; });
        if (!rows.some(function (r) { return catName(r) === cat.name; })) {
            // el catálogo se queda vacío pero lo conservamos hasta que se recargue
            pending.push(cat.name);
        }
        enqueue(function () {
            if (row.id < 0) return null;
            return api("DELETE", apiBase() + "?id=" + row.id);
        });
        return true;
    }

    /* ---------------- búsqueda ---------------- */
    function search(query) {
        query = (query || "").toLowerCase().trim();
        var data = load();
        if (!query) return data;
        return data.filter(function (c) {
            if ((c.title || "").toLowerCase().indexOf(query) !== -1) return true;
            if ((c.code || "").toLowerCase().indexOf(query) !== -1) return true;
            return (c.items || []).some(function (it) {
                return (it[0] || "").toLowerCase().indexOf(query) !== -1 ||
                    (it[1] || "").toLowerCase().indexOf(query) !== -1;
            });
        });
    }

    function toCatalogsMap(data) {
        var map = {};
        (data || load()).forEach(function (c) {
            map[c.code] = { title: c.title, titleEn: c.titleEn, items: c.items };
        });
        return map;
    }

    /* ---------------- tarjetas ---------------- */
    function buildCategoryCardHTML(cat, lang, options) {
        lang = lang || "es";
        options = options || {};
        var title = esc(lang === "en" ? (cat.titleEn || cat.title) : cat.title);
        var desc = esc(lang === "en" ? (cat.descEn || cat.desc) : cat.desc);
        var count = (cat.items && cat.items.length) || 0;
        var photo = cat.image
            ? '<img class="product-photo-img" src="' + esc(cat.image) + '" alt="">'
            : "";
        var hasPhoto = cat.image ? " has-photo" : "";
        var noScanCls = cat.noScan ? " no-scan" : "";
        var code = esc(cat.code);
        var editBtn = options.editable
            ? '<button type="button" class="product-edit-btn" data-edit-code="' + code + '">EDITAR</button>'
            : "";
        var actionLabel = (lang === "en" ? "VIEW CATALOG" : "VER CATÁLOGO");

        if (options.compact) {
            return (
                '<article class="product-card catalog-compact' + hasPhoto + noScanCls + '" data-category="' + (cat.filter || "technology") + '" data-code="' + code + '">' +
                '<div class="product-image">' + photo +
                '<div class="product-image-grid"></div>' + editBtn + '</div>' +
                '<div class="product-info product-info-compact"><h3>' + title + '</h3></div></article>'
            );
        }

        return (
            '<article class="product-card' + hasPhoto + noScanCls + '" data-category="' + (cat.filter || "technology") + '" data-code="' + code + '">' +
            '<div class="product-image">' + photo +
            '<div class="product-image-grid"></div>' +
            '<div class="product-placeholder"><span class="product-code">' + code + '</span>' +
            '<strong>' + esc(cat.label || "CAT") + '</strong><span>' + count + ' PRODUCTOS</span></div>' +
            '<div class="product-status">● AVAILABLE</div>' + editBtn + '</div>' +
            '<div class="product-info"><div class="product-category">' + esc(cat.categoryLabel || "") + '</div>' +
            '<h3>' + title + '</h3><p>' + desc + '</p>' +
            '<div class="product-footer"><span class="product-id">' + code + " · " + count + " productos</span>" +
            '<button type="button" class="product-detail"><span>' + actionLabel + "</span><b>→</b></button>" +
            "</div></div></article>"
        );
    }

    function renderGrid(gridSelector, lang, options) {
        lang = lang || "es";
        options = options || {};
        var grid = document.querySelector(gridSelector);
        if (!grid) return;
        var data = load();
        grid.innerHTML = data.map(function (cat) {
            return buildCategoryCardHTML(cat, lang, options);
        }).join("");
        var counter = document.getElementById("productCount");
        if (counter) counter.textContent = String(data.length).padStart(2, "0");
    }

    function applyToDOM(lang) {
        lang = lang || getLang();
        var data = load();
        var onEmpresa = !!document.getElementById("products");
        var onClientes = !!document.getElementById("productos");
        var editable = onEmpresa;

        var grids = [];
        if (onEmpresa) {
            var g = document.querySelector("#products .products-grid") ||
                document.querySelector(".products-section .products-grid");
            if (g) grids.push(g);
        }
        if (onClientes) {
            var g2 = document.querySelector("#productos .products-section .products-grid");
            if (g2) grids.push(g2);
        }
        if (!grids.length) {
            document.querySelectorAll(".products-section > .products-grid").forEach(function (g3) {
                if (!g3.closest("#categoryCatalog")) grids.push(g3);
            });
        }

        grids.forEach(function (grid) {
            var sec = grid.closest(".products-section");
            if (sec) sec.classList.remove("catalog-open");
            var panel = document.getElementById("categoryCatalog");
            if (panel) { panel.classList.remove("open"); panel.innerHTML = ""; }

            grid.innerHTML = data.length
                ? data.map(function (cat) {
                    return buildCategoryCardHTML(cat, lang, { editable: editable, compact: true });
                }).join("")
                : '<p style="color:#9aa6b8;padding:12px;grid-column:1/-1;">' +
                  (lastError ? "No se pudo cargar el catálogo. Revisa que el servidor y MySQL (XAMPP) estén encendidos."
                             : "Aún no hay productos en la base de datos.") + "</p>";
        });

        var counter = document.getElementById("productCount");
        if (counter) counter.textContent = String(data.length).padStart(2, "0");
    }

    /* ---------------- lectura desde MySQL ---------------- */
    function syncFromDatabase(opts) {
        var silent = !!(opts && opts.silent);
        if (silent && inflight > 0) return Promise.resolve();
        return fetch(apiBase(), { cache: "no-store" })
            .then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then(function (result) {
                if (!result || !Array.isArray(result.productos)) throw new Error("Respuesta inválida");
                lastError = "";
                rows = result.productos.map(function (r) {
                    return {
                        id: Number(r.id),
                        nombre: String(r.nombre || ""),
                        descripcion: String(r.descripcion || ""),
                        categoria: String(r.categoria || ""),
                        imagen: r.imagen ? String(r.imagen) : null
                    };
                });
                // los catálogos nuevos dejan de ser "pendientes" cuando ya tienen productos
                var names = rows.map(catName);
                pending = pending.filter(function (n) { return names.indexOf(n) === -1; });

                if (!silent) applyToDOM(getLang());
                global.dispatchEvent(new CustomEvent("protecta:database-catalog-loaded", {
                    detail: { categories: build().length, products: rows.length, silent: silent }
                }));
            })
            .catch(function (error) {
                lastError = error.message || "error";
                console.error("[Protecta] No se pudo cargar el catálogo desde MySQL:", error);
                if (!silent) applyToDOM(getLang());
                global.dispatchEvent(new CustomEvent("protecta:database-catalog-error", { detail: error.message }));
            });
    }

    global.ProtectaCatalog = {
        load: load,
        save: save,
        getByCode: getByCode,
        updateCategory: updateCategory,
        updateItem: updateItem,
        deleteCategory: deleteCategory,
        addCategory: addCategory,
        addItem: addItem,
        deleteItem: deleteItem,
        search: search,
        toCatalogsMap: toCatalogsMap,
        buildCategoryCardHTML: buildCategoryCardHTML,
        renderGrid: renderGrid,
        applyToDOM: applyToDOM,
        defaults: [],
        esc: esc,
        syncFromDatabase: syncFromDatabase,
        get lastError() { return lastError; }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { syncFromDatabase(); }, { once: true });
    } else {
        syncFromDatabase();
    }
})(window);
