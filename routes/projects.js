var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projectsController.js')
let { check, validationResult, body } = require('express-validator');
let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/projectsAvatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', projectsController.listado);

router.get('/add', projectsController.crear);
router.post('/add', upload.any(), projectsController.agregar);

router.get('/:id', projectsController.detalle);

module.exports = router;