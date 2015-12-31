/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcryptjs=require('bcryptjs');
module.exports = {

  attributes: {

  	name:{
  		type:'string',
  		required:true,
  		defaultsTo:'Sin nombre'
  	},

  	last_name:{
  		type:'string',
  		required:true,
  		defaultsTo:'Sin apellido'
  	},
  	
  	username:{
  		type:'string',
  		required:true,
  		unique:true
  	},

  	email:{
      type:'email',
      required:true,
      unique:true
    // },

    // password:{
    //   type:'string',
    //   required:true
    // },
    // confirm_password:{
    //   type:'string',
    //   required:true
    // },
    // password_enc:{
    //   type:'string'
    // },
    // toJSON:function(){
    // var obj=toObject();
    // delete obj.password;
    // delete obj._csrf;
    // delete obj.confirm_password;
    // return obj;
    }


  // },

  // beforeCreate:function(values,next){
  //   var password=values.password;
  //   var confirm_password=values.confirm_password;
  //   if(!password || !confirm_password || password!==confirm_password){
  //     var passwordDiferente=[{
  //       name:'passwordDiferente',
  //       message:'Las contraseñas deben coincidir'
  //     }]
  //     return next({
  //       error:passwordDiferente
  //     });
  //   }
  //   console.log('estoy en el dcrypt');
  //   bcrypt.genSalt(10, function(err, salt) {
  //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
  //         if(err){
  //           var passwordDiferente=[{
  //             name:'passwordDiferente',
  //             message:'Las contraseñas deben coincidir'
  //           }]
  //           return next({
  //             error:passwordDiferente
  //           });
  //         }
  //         console.log(hash);
  //           values.password_enc=hash;
  //       });
  //   });
  },

  validationMessages:{
    name:{
      string:'El nombre debe ser una cadena válida',
      required:'Debe ingresar el nombre'
    },
    last_name:{
      string:'El apellido debe ser una cadena válida',
      required:'El apellido es requerido'
    },
    username:{
      string:'El nombre de usuario debe ser una cadena válida',
      required:'El nombre de usuario es requerido',
      unique:'El nombre de usuario ya existe'
    },
    email:{
      required:'El email es requerido',
      email:'El formato debe ser tipo email',
      unique:'El correo ya existe'
    }
  }
};
