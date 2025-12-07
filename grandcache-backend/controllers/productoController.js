const db = require('../db');

exports.getProductos = async (req, res) => {
    try {
        const sql = `
            SELECT p.*, c.nombre as nombre_categoria, pr.empresa as nombre_proveedor
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

exports.createProducto = async (req, res) => {
    const { nombre, description, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id } = req.body;

    if (!nombre || !precio) return res.status(400).json({ message: 'Un nombre y precio son requeridos' });

    try {
        const [result] = await db.query(
            `INSERT INTO productos
            (nombre, descripcion, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, description, precio, stock || 0, stock_min || 5, imagen_url, categoria_id, proveedor_id]
        );
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};
