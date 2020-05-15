
      {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
          let archivoUsuario = fs.readFileSync(usersData, {encoding: 'utf-8'});
          let usuarios;
          if (archivoUsuario == '') {
            usuarios = [];
          } else {
            usuarios = JSON.parse(archivoUsuario);
          }
          let usuarioALoguearse

          
          for (let i = 0; i < usuarios.length; i++) {
            if (req.body.email == usuarios[i].email) {
              if (bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                usuarioALoguearse = usuarios[i];
                delete usuarioALoguearse.password
                break;
              }
            }
          }
          
          if (!usuarioALoguearse) {
            return res.render('login', {errors: [
              {msg: 'Datos inválidos'}
            ]});
          }
          
          req.session.login = usuarioALoguearse;
          
          console.log(usuarioALoguearse)
          if (req.body.recordarme) {
            res.cookie('recordarme',
            usuarioALoguearse.email, { maxAge: 60000 })
            console.log('cookie')
          } 

          return res.redirect('/');
          
        } else {
          return res.render('login', {errors: errors.errors});
        } 
      }