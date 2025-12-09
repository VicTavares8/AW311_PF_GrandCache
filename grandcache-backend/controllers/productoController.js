const db = require('../db');

// 1. OBTENER TODOS
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

// 2. OBTENER UNO POR ID (Corregido)
exports.getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        // Corregido: Usamos 'db' en lugar de 'pool'
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// 3. CREAR NUEVO
exports.createProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id } = req.body;

    if (!nombre || !precio) return res.status(400).json({ message: 'Un nombre y precio son requeridos' });

    try {
        const [result] = await db.query(
            `INSERT INTO productos
            (nombre, descripcion, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, precio, stock || 0, stock_min || 5, imagen_url, categoria_id, proveedor_id]
        );
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

// 4. ACTUALIZAR (Agregado para que funcione el botón 'Guardar Cambios')
exports.updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE productos SET
            nombre = ?,
            descripcion = ?,
            precio = ?,
            stock = ?,
            stock_min = ?,
            imagen_url = ?,
            categoria_id = ?,
            proveedor_id = ?
            WHERE id = ?`,
            [nombre, descripcion, precio, stock, stock_min, imagen_url, categoria_id, proveedor_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};
