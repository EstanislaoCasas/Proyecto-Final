var express = require('express');
var router = express.Router();
let projectsController = require('../controllers/projectsController.js')
let multer = require('multer');
let path = require('path');
var loginMiddleware = require('../middlewares/loginMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/projectsAvatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', loginMiddleware, projectsController.listado);

router.get('/add', loginMiddleware, projectsController.crear);
router.post('/add', upload.any(), projectsController.agregar);

router.get('/:id', projectsController.detalle);
//router.post('/:id', projectsController.donaciones);

router.get('/edit/:id', projectsController.editar);
router.post('/edit/:id', projectsController.update);

router.get('/:id', projectsController.detalle);


module.exports = router;