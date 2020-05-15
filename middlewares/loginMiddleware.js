function loginMiddleware(req, res, next) {
    if(req.session.login) {
        next();
    } else {
        res.redirect('/users/login')
    }
}
module.exports = loginMiddleware;