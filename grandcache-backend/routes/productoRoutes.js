const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos
router.get('/', productoController.getProductos);

// <--- NUEVO: Obtener UN producto por ID (Esto arregla el error 404)
router.get('/:id', productoController.getProducto);

// Crear nuevo
router.post('/', productoController.createProducto);

// <--- NUEVO: Actualizar un producto existente (Lo necesitarás al guardar el formulario)
router.put('/:id', productoController.updateProducto);

module.exports = router;
