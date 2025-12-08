const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');

router.get('/resumen', controller.getResumen);

module.exports = router;
