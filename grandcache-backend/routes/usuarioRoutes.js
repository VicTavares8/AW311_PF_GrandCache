const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//cuando se entre a la raíz de cada ruta:
router.get('/', usuarioController.getUsuarios); //se ejecuta getUsuarios
router.post('/', usuarioController.createUsuario); //se ejecuta crearUsuario

module.exports = router;
