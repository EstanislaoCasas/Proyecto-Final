var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js')


router.get('/login', usersController.login);

router.get('/register', usersController.registro);
router.post('/register', usersController.create);


router.get('/my-projects', usersController.misProyectos);

router.get('/edit/:idUser', usersController.editar);

router.get('/list', usersController.list);


module.exports = router;
