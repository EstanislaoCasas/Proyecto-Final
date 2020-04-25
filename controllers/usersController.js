let usersController= {
      login: function(req, res, next) {
        res.render('login');
      },
      registro: function(req, res, next) {
        res.render('register');
      },
      misProyectos: function(req, res, next) {
        res.render('myprojects');
      },
      editar: function(req, res, next) {
        res.render('edit');
      },
      list: function(req, res, next) {
        res.render('userList')
      },
      create: function(req, res, next) {
        let usuario = {
          nombre: req.body.first_name,
          apellido: req.body.last_name,
          email: req.body.email,
          documento: req.body.document,
          contraseña: req.body.password.apellido,
          avatar: req.body.avatar,
          tipo: req.body.type,
          plata: req.body.amount
        }
        res.redirect('../');
      }
};

module.exports = usersController;