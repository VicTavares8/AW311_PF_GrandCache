const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

//Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor de GrandCache funcionando correctamente")
});

//Conexión de rutas
app.use('/api/usuarios', usuarioRoutes);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});
