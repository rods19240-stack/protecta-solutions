-- No necesitas tabla de catálogos aparte.
-- Cada producto tiene una categoría; los catálogos se arman agrupando por `categoria`.

CREATE DATABASE IF NOT EXISTS protecta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE protecta;

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(150) NOT NULL,
  imagen VARCHAR(255) NULL,
  stock INT NULL
);

-- Ejemplo (borra o cambia):
-- INSERT INTO productos (nombre, descripcion, categoria) VALUES
-- ('Cámara IP 4K', 'Cámara domo exterior', 'Videovigilancia'),
-- ('Sensor PIR', 'Detector de movimiento', 'Control de Alarmas');
