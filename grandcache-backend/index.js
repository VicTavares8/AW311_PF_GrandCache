const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const connection = require('./db');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("¡Servidor de Grand Cache funcionando correctamente!")
});

app.get('/api/test', (req, res) => {
  const sql = 'SELECT * FROM productos';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al traer los datos');
    }
    res.json({
      mensaje: 'Exito al traer los datos',
      datos: results
    });
  });
});

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});
