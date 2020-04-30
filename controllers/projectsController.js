let db = require('../database/models');

let projectsController= {
    listado: function(req, res) {
        db.Proyectos.findAll()
            .then(function(proyectos) {
                res.render('allProjects', {proyectos: proyectos})
            })
    },
    detalle: function(req, res) {
        res.render('projectDetail');
    },
    crear: function(req, res) {
        res.render('addProject');
    },
    agregar: function(req, res) {
        db.Proyectos.create({
            title: req.body.title,
            short_description: req.body.short_description,
            long_description: req.body.long_description,
            amount: req.body.amount,
            avatar: req.body.avatar
        });
        
        res.redirect('/');
    },
    editar: function(req, res) {
        res.render('editProject')
    }
};

module.exports = projectsController;