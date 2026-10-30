<?php
/**
 * Login empresa — valida contra tabla `contraseña` (campo `contraseña`)
 * POST JSON: { "password": "..." }
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$servidor   = "localhost";
$usuario    = "root";
$clave      = "";
$base_datos = "protecta";

$enlace = @mysqli_connect($servidor, $usuario, $clave, $base_datos);
if (!$enlace) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo conectar a MySQL"]);
    exit;
}
mysqli_set_charset($enlace, "utf8mb4");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}
$password = trim((string)($data["password"] ?? $data["contraseña"] ?? ""));

if ($password === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Contraseña vacía"]);
    mysqli_close($enlace);
    exit;
}

/**
 * Busca la clave en la tabla `contraseña`.
 * Prueba varios nombres por si la tabla se guardó sin ñ.
 */
function password_matches($enlace, $password) {
    $queries = [
        "SELECT 1 FROM `contraseña` WHERE `contraseña` = ? LIMIT 1",
        "SELECT 1 FROM `contrasena` WHERE `contrasena` = ? LIMIT 1",
        "SELECT 1 FROM `contraseña` WHERE `contrasena` = ? LIMIT 1",
        "SELECT 1 FROM contraseña WHERE contraseña = ? LIMIT 1",
    ];
    foreach ($queries as $sql) {
        $stmt = @mysqli_prepare($enlace, $sql);
        if (!$stmt) continue;
        mysqli_stmt_bind_param($stmt, "s", $password);
        if (!mysqli_stmt_execute($stmt)) {
            mysqli_stmt_close($stmt);
            continue;
        }
        $res = mysqli_stmt_get_result($stmt);
        $ok = $res && mysqli_fetch_row($res);
        mysqli_stmt_close($stmt);
        if ($ok) return true;
    }

    // Último recurso: leer todas las filas y comparar en PHP
    $tables = ["contraseña", "contrasena"];
    foreach ($tables as $table) {
        $res = @mysqli_query($enlace, "SELECT * FROM `$table` LIMIT 50");
        if (!$res) continue;
        while ($row = mysqli_fetch_assoc($res)) {
            foreach ($row as $val) {
                if ((string)$val === $password) {
                    return true;
                }
            }
        }
    }
    return false;
}

if (!password_matches($enlace, $password)) {
    http_response_code(401);
    echo json_encode(["ok" => false, "error" => "Clave incorrecta"]);
    mysqli_close($enlace);
    exit;
}

$token = bin2hex(random_bytes(24));
echo json_encode([
    "ok" => true,
    "token" => $token,
    "mensaje" => "Acceso concedido"
], JSON_UNESCAPED_UNICODE);

mysqli_close($enlace);
