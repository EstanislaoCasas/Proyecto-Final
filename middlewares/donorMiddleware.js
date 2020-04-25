const fs = require('fs');

function donorMiddleware(req, res, next) {
    fs.appendFileSync('log.txt', 'Se ingresó a ' + req.url)

    next();
}

module.exports = donorMiddleware;