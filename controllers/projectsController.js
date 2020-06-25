let db = require('../database/models');

let projectsController= {
    listado: function(req, res, next) {
        db.Proyectos.findAll()
            .then(function(proyectos) {
                res.render('allProjects', {proyectos: proyectos})
            })
    },
    detalle: function(req, res, next) {
    db.Proyectos.findByPk(req.params.id,
            {include: [{association: 'usuario'}]})
            .then(function(proyecto) {
                res.render('projectDetail', {proyecto: proyecto})
            })
    },
    donaciones: function(req, res) {
        db.Donaciones.create({
            amount: req.body.aporte,
            user_id: req.session.user_id,
            project_id: req.params.id
        })

        db.Proyectos.findByPk(req.params.id).then(project=>{ 
            project.increment('donations_total', { by: req.body.aporte })
        })

        res.redirect('/')
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
            avatar: req.body.avatar,
            user_id: req.session.user_id
        })
            .then(function(proyectos) {
                res.redirect('/')
            })
            .then(function(proyectos) {
                res.render('index', {proyectos: proyectos})
            })
    },
    editar: function(req, res) {
        db.Proyectos.findByPk(req.params.id)
            .then(function(proyecto) {
                res.render('editProject', {proyecto: proyecto});
        })
    },
    update: function(req, res) {
        db.Proyectos.update({
            title: req.body.title,
            short_description: req.body.short_description,
            long_description: req.body.long_description,
            amount: req.body.amount,
            avatar: req.body.avatar
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    }
};

module.exports = projectsController;