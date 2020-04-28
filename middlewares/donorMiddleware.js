const fs = require('fs');

function donorMiddleware(req, res, next) {
    if (req.session.usuarioLogueado != undefined){
        next();
    } else {
        res.render('register')
    }
}

module.exports = donorMiddleware