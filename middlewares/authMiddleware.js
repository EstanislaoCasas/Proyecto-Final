function authMiddleware(req, res, next) {
    if(req.session.login) {
        res.locals.login = req.session.login
        res.locals.type = req.session.login.type
        res.locals.id = req.session.login.id
    } else {
        res.locals.login = false
        res.locals.type = false
        res.locals.id = false
    }
    next();
}
module.exports = authMiddleware;