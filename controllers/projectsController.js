let db = require('../database/models');
let sequelize = db.sequelize;

let projectsController= {
    listado: function(req, res, next) {
        res.render('allProjects', projectsController);
        },
    detalle: function(req, res, next) {
        res.render('projectDetail', projectsController);
        },
    crear: function(req, res, next) {
        res.render('addProject', projectsController);
        },
    editar: (req, res) => {
        res.send('allProjects')
    },
};

module.exports = projectsController;