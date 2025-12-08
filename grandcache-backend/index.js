const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

//Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const productoRoutes = require('./routes/productoRoutes');
const movimientoRoutes = require('./routes/movimientoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor de GrandCache funcionando correctamente")
});

//Conexión de rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/movimientos', movimientoRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});
