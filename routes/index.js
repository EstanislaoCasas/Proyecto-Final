var express = require('express');
var router = express.Router();
let db = require('../database/models');


/* GET home page. */
router.get('/', function(req, res, next) {
  db.Proyectos.findAll()
    .then(function(proyectos) {
        res.render('index', {proyectos: proyectos})
    })
});

module.exports = router;