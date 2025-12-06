DROP DATABASE IF EXISTS grandcache_db;
CREATE DATABASE grandcache_db;
USE grandcache_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(100),
    rol ENUM('admin', 'empleado') DEFAULT 'empleado',
    f_h_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa VARCHAR(100) NOT NULL,
    email_contacto VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_min INT DEFAULT 5,
    imagen_url VARCHAR(255),
    categoria_id INT,
    proveedor_id INT,
    f_h_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON DELETE SET NULL
);

CREATE TABLE movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    tipo ENUM('IN', 'OUT') NOT NULL,
    cantidad INT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


insert into categorias (nombre, descripcion) values 
('Laptops', 'Portatiles de rendimiento variado, ideales para trabajo, estudio y juego'),
('Perifericos', 'Teclados, mouse y audio'); 

insert into proveedores (empresa, email_contacto) values 
('Samsung Electronics', 'contacto.smsg@samsung.com');

insert into productos (nombre, descripcion, precio, stock, stock_min, categoria_id, proveedor_id) values 
('Monitor Curvo', 'Pantalla LED Full HD', 3500.00, 10, 3, 2, 1);