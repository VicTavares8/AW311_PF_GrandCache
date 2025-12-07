const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.get('/', proveedorController.getProveedores);
router.post('/', proveedorController.createProveedor);

module.exports = router;
