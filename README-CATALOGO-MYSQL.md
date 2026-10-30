# Protecta Solutions: catálogo conectado a MySQL (XAMPP)

## Cómo funciona
- Todos los productos salen de la tabla `productos` de la base `protecta` (XAMPP). Ya no se usan productos de ejemplo ni `localStorage`.
- Cada producto usa `nombre`, `descripcion`, `categoria` (= el catálogo) e `imagen`.
- **clientes.html**: solo muestra lo que está en la base de datos (solo lectura).
- **empresa.html** (sección Productos y Gestión): crear, editar y borrar productos, renombrar o borrar catálogos y subir imágenes.
- Las imágenes se guardan en la carpeta `uploads/` del proyecto y en la base se guarda su ruta (ej. `uploads/3f9a...jpg`).
- Si la tabla no tiene la columna `imagen`, el servidor la crea sola al arrancar (`VARCHAR(255) NULL`). No toca los demás datos.
- La clave de Empresa ahora se valida en el servidor (`ADMIN_PASSWORD` en `.env`, por defecto `protecta2026`).

## Pasos en Windows
1. Abre XAMPP y enciende **MySQL**.
2. Copia `.env.example` como `.env` y revisa `DB_*` (en XAMPP normalmente usuario `root` y contraseña vacía).
3. En la carpeta del proyecto:
   ```bash
   npm install
   npm start
   ```
4. Abre **http://localhost:3000** (no abras los .html con doble clic ni desde Apache: la API vive en el servidor de Node).

## Notas
- Un catálogo nuevo se guarda en la base en cuanto le agregas su primer producto (la categoría es solo un texto de los productos).
- Borrar un catálogo borra todos sus productos de la base.
- Imágenes permitidas: PNG, JPG, WEBP o GIF de hasta 5 MB.
