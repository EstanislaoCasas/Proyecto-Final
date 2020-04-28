let bcrypt = require('bcrypt');
let fs = require('fs');
let path = require('path')
let {check, validationResult, body} = require('express-validator');
let usersData = path.join('data', 'users.json');

let usersController= {
      registro: function(req, res, next) {
        res.render('register');
      },
      create: function(req, res, next) {
        let usuario = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          document: req.body.document,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: req.files[0].filename,
          type: req.body.type,
          amount: req.body.amount
        }
        
        let errors = validationResult(req);

        if (errors.isEmpty()) {

          let archivoUsuario = fs.readFileSync(usersData, {encoding: 'utf-8'});
          let usuarios;
          if (archivoUsuario == '') {
            usuarios = [];
          } else {
            usuarios = JSON.parse(archivoUsuario);
          }

          usuarios.push(usuario);

          usuariosJSON = JSON.stringify(usuarios);

          fs.writeFileSync(usersData, usuariosJSON);

          return res.render('index');
        } else {
          return res.render('register', {errors: errors.errors})
        }
      },
      login: function(req, res, next) {
        res.render('login');
      },
      processLogin: function(req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
          let archivoUsuario = fs.readFileSync(usersData, {encoding: 'utf-8'});
          let usuarios;
          if (archivoUsuario == '') {
            usuarios = [];
          } else {
            usuarios = JSON.parse(archivoUsuario);
          }

          for (let i = 0; i < usuarios.length; i++) {
            if (req.body.email == usuarios[i].email && bcrypt.compareSync(req.body.password , usuarios[i].password)) {
              var usuarioALoguearse = usuarios[i]
              break;
            } 
          }
          if (usuarioALoguearse == undefined) {
            return res.render('login', {errors: [
              {msg: 'Datos inválidos'}
            ]});
          }

          req.session.usuarioLogueado = usuarioALoguearse;
        } else {
          return res.render('login', {errors: errors.errors});
        }

        
        
      },
      
      misProyectos: function(req, res, next) {
        res.render('myprojects');
      },
      editar: function(req, res, next) {
        res.render('edit');
      },
      list: function(req, res, next) {
        res.render('userList')
      }
};

module.exports = usersController;