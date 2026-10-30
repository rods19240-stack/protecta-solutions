<?php
/**
 * API productos — XAMPP
 * GET  listar
 * POST crear (JSON: nombre, descripcion, categoria, imagenData base64)
 * POST action=update  (id, nombre, descripcion, categoria, imagenData)
 * POST action=delete  (id)
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Protecta-Token, x-admin-token");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$enlace = @mysqli_connect("localhost", "root", "", "protecta");
if (!$enlace) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "MySQL: " . mysqli_connect_error()], JSON_UNESCAPED_UNICODE);
    exit;
}
mysqli_set_charset($enlace, "utf8mb4");

$uploadsDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . "uploads";
if (!is_dir($uploadsDir)) {
    @mkdir($uploadsDir, 0755, true);
}

function id_column($enlace) {
    static $col = null;
    if ($col !== null) return $col;
    $res = mysqli_query($enlace, "SHOW COLUMNS FROM productos");
    $col = false;
    if ($res) {
        while ($c = mysqli_fetch_assoc($res)) {
            $f = strtolower($c["Field"]);
            if ($f === "id_producto" || $f === "id") {
                $col = $f;
                break;
            }
        }
    }
    return $col;
}

function ensure_imagen_column($enlace) {
    $chk = mysqli_query($enlace, "SHOW COLUMNS FROM productos LIKE 'imagen'");
    if ($chk && mysqli_num_rows($chk) === 0) {
        mysqli_query($enlace, "ALTER TABLE productos ADD COLUMN imagen VARCHAR(255) NULL");
    }
}
ensure_imagen_column($enlace);

function img_path($name) {
    if ($name === null || $name === "") return null;
    $name = trim(str_replace("\\", "/", $name));
    if (preg_match('#^(https?:|data:|/)#i', $name)) return $name;
    if (strpos($name, "uploads/") === 0 || strpos($name, "img/") === 0) return $name;
    return "img/" . ltrim($name, "/");
}

/** Guarda data URL base64 en /uploads y devuelve ruta relativa */
function save_data_url($dataUrl, $uploadsDir) {
    if (!$dataUrl || !is_string($dataUrl) || strpos($dataUrl, "data:image/") !== 0) {
        return null;
    }
    if (!preg_match('#^data:(image/[a-zA-Z0-9+.-]+);base64,(.+)$#', $dataUrl, $m)) {
        return null;
    }
    $mime = strtolower($m[1]);
    $extMap = [
        "image/jpeg" => "jpg",
        "image/jpg"  => "jpg",
        "image/png"  => "png",
        "image/webp" => "webp",
        "image/gif"  => "gif",
    ];
    if (!isset($extMap[$mime])) return null;
    $bin = base64_decode($m[2], true);
    if ($bin === false || strlen($bin) > 5 * 1024 * 1024) return null;
    $name = "prod_" . date("Ymd_His") . "_" . bin2hex(random_bytes(4)) . "." . $extMap[$mime];
    $path = $uploadsDir . DIRECTORY_SEPARATOR . $name;
    if (file_put_contents($path, $bin) === false) return null;
    return "uploads/" . $name;
}

function map_row($r, $idCol, $index) {
    $id = ($idCol && isset($r[$idCol])) ? (int)$r[$idCol] : ($index + 1);
    return [
        "id"          => $id,
        "nombre"      => $r["nombre"] ?? "",
        "descripcion" => $r["descripcion"] ?? "",
        "categoria"   => $r["categoria"] ?? "",
        "imagen"      => img_path($r["imagen"] ?? null),
        "stock"       => isset($r["stock"]) ? (int)$r["stock"] : null
    ];
}

$method = $_SERVER["REQUEST_METHOD"];
$idCol = id_column($enlace);
$raw = file_get_contents("php://input");
$body = json_decode($raw, true);
if (!is_array($body)) $body = $_POST;
$action = $_GET["action"] ?? ($body["action"] ?? "");
$id = (int)($_GET["id"] ?? ($body["id"] ?? 0));

// ---------- GET ----------
if ($method === "GET" && $action === "") {
    $res = mysqli_query($enlace, "SELECT * FROM productos ORDER BY categoria ASC, nombre ASC");
    if (!$res) {
        http_response_code(500);
        echo json_encode(["ok" => false, "error" => mysqli_error($enlace)], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $list = [];
    $i = 0;
    while ($r = mysqli_fetch_assoc($res)) {
        $list[] = map_row($r, $idCol, $i++);
    }
    echo json_encode(["ok" => true, "productos" => $list], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- CREATE ----------
if ($method === "POST" && ($action === "" || $action === "create")) {
    $nombre = trim($body["nombre"] ?? "");
    $descripcion = trim($body["descripcion"] ?? "");
    $categoria = trim($body["categoria"] ?? "");
    if ($nombre === "" || $categoria === "") {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Nombre y categoría obligatorios"]);
        exit;
    }
    $imagen = null;
    if (!empty($body["imagenData"])) {
        $imagen = save_data_url($body["imagenData"], $uploadsDir);
    } elseif (!empty($body["imagen"])) {
        $imagen = trim($body["imagen"]);
    }
    $stmt = mysqli_prepare($enlace, "INSERT INTO productos (nombre, descripcion, categoria, imagen) VALUES (?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "ssss", $nombre, $descripcion, $categoria, $imagen);
    if (!mysqli_stmt_execute($stmt)) {
        http_response_code(500);
        echo json_encode(["ok" => false, "error" => mysqli_stmt_error($stmt)]);
        exit;
    }
    $newId = mysqli_insert_id($enlace);
    echo json_encode(["ok" => true, "id" => $newId, "imagen" => img_path($imagen)], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- UPDATE ----------
if ($method === "PUT" || ($method === "POST" && $action === "update") || ($method === "POST" && $id > 0 && isset($body["nombre"]))) {
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "ID inválido. Agrega id_producto a la tabla productos."]);
        exit;
    }
    if (!$idCol) {
        http_response_code(500);
        echo json_encode(["ok" => false, "error" => "La tabla productos no tiene columna id. Ejecuta: ALTER TABLE productos ADD id_producto INT AUTO_INCREMENT PRIMARY KEY FIRST;"]);
        exit;
    }
    $nombre = trim($body["nombre"] ?? "");
    $descripcion = trim($body["descripcion"] ?? "");
    $categoria = trim($body["categoria"] ?? "");

    // Leer actual
    $stmt = mysqli_prepare($enlace, "SELECT * FROM productos WHERE `$idCol` = ? LIMIT 1");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $current = $res ? mysqli_fetch_assoc($res) : null;
    if (!$current) {
        http_response_code(404);
        echo json_encode(["ok" => false, "error" => "Producto no encontrado"]);
        exit;
    }
    if ($nombre === "") $nombre = $current["nombre"];
    if ($descripcion === "" && isset($body["descripcion"])) $descripcion = "";
    if ($descripcion === "" && !isset($body["descripcion"])) $descripcion = $current["descripcion"] ?? "";
    if ($categoria === "") $categoria = $current["categoria"] ?? "";

    $imagen = $current["imagen"] ?? null;
    if (!empty($body["imagenData"])) {
        $saved = save_data_url($body["imagenData"], $uploadsDir);
        if ($saved) $imagen = $saved;
    }

    $sql = "UPDATE productos SET nombre=?, descripcion=?, categoria=?, imagen=? WHERE `$idCol`=?";
    $stmt = mysqli_prepare($enlace, $sql);
    mysqli_stmt_bind_param($stmt, "ssssi", $nombre, $descripcion, $categoria, $imagen, $id);
    if (!mysqli_stmt_execute($stmt)) {
        http_response_code(500);
        echo json_encode(["ok" => false, "error" => mysqli_stmt_error($stmt)]);
        exit;
    }
    echo json_encode(["ok" => true, "id" => $id, "imagen" => img_path($imagen)], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- DELETE ----------
if ($method === "DELETE" || ($method === "POST" && $action === "delete")) {
    if ($id <= 0 || !$idCol) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "ID inválido"]);
        exit;
    }
    $stmt = mysqli_prepare($enlace, "DELETE FROM productos WHERE `$idCol`=?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    echo json_encode(["ok" => true]);
    exit;
}

http_response_code(405);
echo json_encode(["ok" => false, "error" => "Método no permitido"]);
