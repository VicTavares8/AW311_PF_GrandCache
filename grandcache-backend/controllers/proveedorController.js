const db = require('../db');

exports.getProveedores = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};

exports.createProveedor = async (req, res) => {
    const { empresa, email_contacto, telefono } = req.body;
    if (!empresa) return res.status(400).json({ message: 'El nombre de la empresa es requerido' });

    try {
        const [result] = await db.query(
            'INSERT INTO proveedores (empresa, email_contacto, telefono) VALUES (?, ?, ?)',
            [empresa, email_contacto, telefono]
        );
        res.status(201).json({ message: 'Proveedor creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proveedor' });
    }
};
