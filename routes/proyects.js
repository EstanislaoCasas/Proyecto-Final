var express = require('express');
var router = express.Router();
var proyectsController = require('../controllers/proyectsController.js')

/* GET home page.
router.get('/3', productsController.productDetail);
*/
router.get('/detail', function(req, res, next) {
  res.render('proyectDetail', proyectsController);
  });

router.get('/addProyect', function(req, res, next) {
  res.render('addProyect', proyectsController);
  });

module.exports = router;