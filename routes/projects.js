var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projectsController.js')


router.get('/', projectsController.listado);

router.get('/detail/:id', projectsController.detalle);

router.get('/add', projectsController.crear);

module.exports = router;