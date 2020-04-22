var express = require('express');
var router = express.Router();
var proyectsController = require('../controllers/proyectsController.js')

/* GET home page.
router.get('/3', proyectsController.proyectDetail);
*/
router.get('/', function(req, res, next) {
  res.render('allProyects', proyectsController);
  });

router.get('/detail', function(req, res, next) {
  res.render('proyectDetail', proyectsController);
  });

router.get('/add', function(req, res, next) {
  res.render('addProyect', proyectsController);
  });

module.exports = router;