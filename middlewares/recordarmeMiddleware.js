let db = require('../database/models')

function recordarmeMiddleware(req, res, next) {
    if(req.cookies.recordarme && !req.session.login) {
        db.Usuarios.findOne({
          where: {
            email: req.cookies.recordarme
          }})
          .then(function(usuario) {
            req.session.login = usuario;
        })
        
    }
    next();
}
module.exports = recordarmeMiddleware;