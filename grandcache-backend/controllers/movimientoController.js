const db = require('../db');

exports.getMovimientos = async (req, res) => {
    try {
        const sql = `
            SELECT m.*, p.nombre as nombre_producto, u.nombre_usuario
            FROM movements m
            LEFT JOIN productos p ON m.id_producto = p.id
            LEFT JOIN usuarios u ON m.id_usuario = u.id
            ORDER BY m.fecha_hora DESC
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener movimientos' });
    }
};

exports.createMovimiento = async (req, res) => {
    const { id_producto, tipo, cantidad, id_usuario } = req.body;

    if (!id_producto || !tipo || !cantidad) {
        return res.status(400).json({ message: 'Un producto, tipo de producto y cantidad de producto son requeridos' });
    }

    try {
        //registro del movimiento
        const [result] = await db.query(
            'INSERT INTO movements (id_producto, tipo, cantidad, id_usuario) VALUES (?, ?, ?, ?)',
            [id_producto, tipo, cantidad, id_usuario]
        );

        //actualización del stock del producto. IN suma, OUT resta.
        let sqlUpdate = '';
        if (tipo === 'IN') {
            sqlUpdate = 'UPDATE productos SET stock = stock + ? WHERE id = ?';
        } else {
            sqlUpdate = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
        }

        await db.query(sqlUpdate, [cantidad, id_producto]);

        res.status(201).json({ message: 'Movimiento registrado y stock actualizado', id: result.insertId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar movimiento' });
    }
};
