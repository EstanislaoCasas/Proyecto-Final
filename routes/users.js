var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js')


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', usersController);
});

router.get('/register', function(req, res, next) {
  res.render('register', usersController);
});

router.get('/my-proyects', function(req, res, next) {
  res.render('myProyects', usersController);
});

router.get('/edit', function(req, res, next) {
  res.render('edit', usersController);
});

module.exports = router;
