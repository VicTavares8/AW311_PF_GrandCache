// Importamos la conexión a la BD que acabamos de configurar
const db = require('../db');

// GET ALL USUARIOS
exports.getUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// CREATE USUARIO
exports.createUsuario = async (req, res) => {
    const { nombre_usuario, password, nombre_completo, rol } = req.body;

    if (!nombre_usuario || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y una contraseña son necesarios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre_usuario, password, nombre_completo, rol) VALUES (?, ?, ?, ?)',
            [nombre_usuario, password, nombre_completo, rol || 'empleado']
        );
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};
