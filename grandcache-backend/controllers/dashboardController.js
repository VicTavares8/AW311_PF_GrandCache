const db = require('../db');

exports.getResumen = async (req, res) => {
    try {
        //tablas de impacto o KPI's
        const sqlKPIs = `
            SELECT
                (SELECT COUNT(*) FROM productos) as totalProductos,
                (SELECT SUM(stock * precio) FROM productos) as valorTotal,
                (SELECT COUNT(*) FROM productos WHERE stock <= stock_min) as stockBajo,
                (SELECT COUNT(*) FROM categorias) as totalCategorias
        `;

        //para gráficas
        const sqlGrafica = `
            SELECT c.nombre as categoria, COUNT(p.id) as cantidad
            FROM categorias c
            LEFT JOIN productos p ON c.id = p.categoria_id
            GROUP BY c.id
        `;

        //tabla de resúmen con 5 ultimos movimientos
        const sqlMovimientos = `
            SELECT m.*, p.nombre as producto, u.nombre_usuario
            FROM movements m
            JOIN productos p ON m.id_producto = p.id
            JOIN usuarios u ON m.id_usuario = u.id
            ORDER BY m.fecha_hora DESC
            LIMIT 5
        `;

        const [kpis] = await db.query(sqlKPIs);
        const [grafica] = await db.query(sqlGrafica);
        const [movimientos] = await db.query(sqlMovimientos);

        res.json({
            kpis: kpis[0],
            grafica: grafica,
            movimientos: movimientos
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener resumen de dashboard' });
    }
};
