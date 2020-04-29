var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController.js');
let { check, validationResult, body } = require('express-validator');
let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/avatars')
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
    check('amount').isNumeric(),
    body('email').custom(function(value) {
      let archivoUsuario = fs.readFileSync('data/users.json', {encoding: 'utf-8'});
      let usuarios;
      if (archivoUsuario== '') {
        usuarios = [];
      } else {
        usuarios = JSON.parse(archivoUsuario);
      }

      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email == value) {
          return false;
        }
      }
      return true;
    }).withMessage('Usuario ya existente')
], usersController.create);

router.get('/login', usersController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Email inválido')
], usersController.processLogin);

router.get('/my-projects', usersController.misProyectos);

router.get('/edit/:idUser', usersController.editar);

router.get('/list', usersController.list);

router.get('/check', function(req, res) {
  if (req.session.login == undefined) {
    res.send('No estas logueado');
  } else {
    res.send('El usuario Logueado es ' + req.session.login.email);
  }
})

module.exports = router;
