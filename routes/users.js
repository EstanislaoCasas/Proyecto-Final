var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js');
let { check, validationResult, body } = require('express-validator');
let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/usersAvatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname))
    }
  })
  
  var upload = multer({ storage: storage })

router.get('/register', usersController.registro);
router.post('/register', upload.any(), [
    check('first_name').isLength({max: 45}),
    check('last_name').isLength({max: 45}),
    check('email').isEmail().withMessage('Email inválido'),
    check('document').isLength({max: 8}),
    check('password').isLength({min: 6, max: 20}).withMessage('La contraseña debe tener entre 6 y 20 caractéres'),
    check('amount').isNumeric()
  ], usersController.create);

router.get('/login', usersController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({min: 6, max: 20})
], usersController.processLogin);

router.get('/logout', usersController.logout);

router.get('/my-projects', usersController.misProyectos);

router.get('/edit', usersController.editar);
router.post('/edit', usersController.update);

router.get('/list', usersController.list);

router.get('/check', function(req, res) {
  if (req.session.login == undefined) {
    res.send('No estas logueado');
  } else {
    res.send('El usuario Logueado es ' + req.session.login.email);
  }
})

module.exports = router;
