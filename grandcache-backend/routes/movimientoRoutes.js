const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');

router.get('/', movimientoController.getMovimientos);
router.post('/', movimientoController.createMovimiento);

module.exports = router;
