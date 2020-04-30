function usersMiddleware(req, res, next) {
    if(req.session.login == undefined) {
        next(); 
    } else {
        res.send("Ya estas logueado")
    }
}
module.exports = usersMiddleware;