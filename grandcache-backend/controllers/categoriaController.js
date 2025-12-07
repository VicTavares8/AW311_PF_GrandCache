const db = require('../db');

exports.getCategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

exports.createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Un nombre es requerido' });

    try {
        const [result] = await db.query(
            'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );
        res.status(201).json({ message: 'Categoría creada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoría' });
    }
};
