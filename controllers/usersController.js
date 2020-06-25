let bcrypt = require('bcrypt');
let {check, validationResult, body} = require('express-validator');
let db = require('../database/models');

let usersController= {
      registro: function(req, res, next) {
        res.render('register');
      },
      create: function(req, res, next) {
        let errors = validationResult(req);
    
        db.Usuarios.count({ where: { email: req.body.email } }).then(count => {
          if (count != 0) {
            return res.render("register", {
              errors: [{ msg: "El email ya se encuentra registrado" }],
              data: req.body
            });
          } else {
            if (!errors.isEmpty()) {
              return res.render("register", {
                errors: errors.errors,
                data: req.body
              });
            } else {
              db.Usuarios.create({
                name: req.body.first_name + ' ' + req.body.last_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                identification_number: req.body.document,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.files[0].filename,
                type: req.body.type,
                amount: req.body.amount
              });
              return res.redirect("/users/login");
            }
          }
        });
      },
      login: function(req, res, next) {
        res.render('login');
      },
      processLogin: function(req, res, next) {
        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
          db.Usuarios.findOne({ where: { email: req.body.email } })
            .then(function(usuario) {
              if (bcrypt.compareSync(req.body.password, usuario.password)) {
                req.session.user_id = usuario.id
                req.session.login = usuario
                delete usuario.password
                if (req.body.recordarme) {
                  res.cookie('recordarme',
                  usuario.email, { maxAge: 60000 })
                } 
                res.redirect("/");
              } 
              else {
                res.render("login", {
                  errors: [{msg: "Contraseña incorrecta"}]
                });
              }
            })
            .catch(function(error){
              res.render("login", {
                errors: [{msg: "Cuenta inexistente"}]
              })
            })
        } else {
          res.render("login", { errors: errors.errors, data: req.body });
        }
      },
      logout: function(req, res) {
        res.cookie('recordarme', null, { maxAge: -1 })
        req.session.destroy()
        res.redirect('/');
      },
      misProyectos: function(req, res, next) {
        res.render('myprojects');
      },
      editar: function(req, res) {
        db.Usuarios.findByPk(req.params.id)
          .then(function(usuario) {
            res.render('editProfile', {usuario: usuario});
        })
      },
      update: function(req, res) {
        db.Usuarios.update({
            nombre: req.body.first_name,
            apellido: req.body.last_name,
            email: req.body.email,
            contraseña: req.body.password,
            avatar: req.body.avatar,
            amount: req.body.amount
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
      },
      list: function(req, res, next) {
        res.render('userList')
      }
};

module.exports = usersController;