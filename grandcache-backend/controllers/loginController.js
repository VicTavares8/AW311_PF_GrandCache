const db = require('../db');

//LOGIN
exports.login = async (req, res) => {
    //recibir usuario y contraseña
    const { nombre_usuario, password } = req.body;

    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?',
            [nombre_usuario, password]
        );

        if (rows.length > 0) {
            const usuario = rows[0];
            res.json({
                success: true,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre_completo,
                    rol: usuario.rol
                }
            });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

//REGISTRO
exports.register = async (req, res) => {
    const { nombre_usuario, nombre_completo, password } = req.body;

    try {
        // Verificar duplicados
        const [existing] = await db.query('SELECT id FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Insertar
        await db.query(
            'INSERT INTO usuarios (nombre_usuario, nombre_completo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre_usuario, nombre_completo, password, 'empleado'] //empleado por defecto
        );

        res.json({ success: true, message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};
