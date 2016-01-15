/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var md5=require('md5');
module.exports = {
  registro: function(req, res) {
    res.view('User/registro');
  },
  login:function(req,res){
    res.view('User/login');
  },
  loguear:function(req,res){
    // User.find({username:req.param('username'),password_enc:md5(req.param('password'))}).exec(function(error,users){
    //   console.log(error);
    //   if(users.length!==0){
    //
    //   }else{
    //     return res.json([{name:'Usuario no encontrado',message:'Usuario y/o contraseña incorrectos'}]);
    //   }
    // });

    passport.authenticate('local', function(err, user, info) { 
            if ((err) || (!user)) { 
                return res.json({
                    resultado:0,
                    message: info.message, 
                    user: user 
                }); 
            } 
            req.logIn(user, function(err) { 
                if (err) res.send(err); 
                return res.json({
                    resultado:1,
                    message: info.message, 
                    user: user 
                }); 
            }); 
        })(req, res); 





  },
  registrar: function(req, res) {

    var objUser = {
      name: req.param('name'),
      username: req.param('username'),
      email: req.param('email'),
      password: req.param('password'),
      confirm_password: req.param('confirm_password'),
      confirm_enc:''
    };

    if(objUser.password!=objUser.confirm_password){
      return res.json([{name:'Diferentes contraseñas',
                      message:"Las contraseñas son diferentes"}]);
    }

      User.create(objUser, function(error, user) {
        if (error) {
          return res.json(Mensajes(error));
        } else {
          return res.send("Registrado correctamente");
        }
      });

  },
  loguear2:function(req,res){
    User.find({username:req.param('username'),password_enc:md5(req.param('password'))}).exec(function(error,users){
      console.log(users);
      if(users.length!==0){
        return res.redirect('/libros');
      }else{
        return res.view('User/login',{error:'Usuario y/o contraseña incorrectos'});
        // return res.redirect('/login');
        // return res.ok({error:'Usuario y/o contraseña incorrectos'},'User/login');
      }
    });
  },
  registrar2: function(req, res) {

    var objUser = {
      name: req.param('name'),
      username: req.param('username'),
      email: req.param('email'),
      password: req.param('password'),
      confirm_password: req.param('confirm_password'),
      confirm_enc:''
    };

    if(objUser.password!=objUser.confirm_password){
      return res.view('User/registro',{error:"Las contraseñas son diferentes"});
    }

      User.create(objUser, function(error, user) {
        console.log(error);
        if (error) {
          return res.view('User/registro',Mensajes(error));
        } else {
          return res.send('ok');
        }
      });

  }


  // listar: function(req, res) {
  //   User.find({}).exec(function findb(error, lista) {
  //     console.log(lista);
  //     res.view('listaUsuarios', {
  //       lista: lista
  //     });
  //   });
  // },
  //
  // editar: function(req, res, next) {
  //   User.findOne(req.param('id'), function(error, user) {
  //     if (error) {
  //       res.json({
  //         msj: error
  //       });
  //     }
  //     if (user) {
  //       res.view('editarUsuario', {
  //         user: user
  //       });
  //     } else if (!user) {
  //       return next();
  //     }
  //   });
  //
  // },
  //
  // actualizar: function(req, res, next) {
  //   var objUser = {
  //     name: req.param('name'),
  //     username: req.param('username'),
  //     email: req.param('email')
  //   };
  //   User.update(req.param('id'), objUser, function(error, user) {
  //     if (error) {
  //       res.json(Mensajes(error));
  //     } else {
  //       res.ok('ok');
  //     }
  //   });
  // }


};

/**
 * Controla los mensajes de error
 * @param {[type]} error [Parametro que contiene el objeto de errores que asu ves dentro de una de sus propiedades contiene un array]
 */
function Mensajes(error) {
  var errores = [];
  var propiedades = Object.getOwnPropertyNames(error.Errors);

  propiedades.map(function(index, elem) {
    for (var i = 0; i < error.Errors[index].length; i++) {
      // if(i%2===0){
        errores.push(error.Errors[index][i]);
      // }
    }
  });
  return errores;
}
