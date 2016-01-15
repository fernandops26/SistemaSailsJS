/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var md5=require('md5');
module.exports = {

  attributes: {
    id:{
      type:'string',
      required:true,
      defaultsTo: GenerarId(),
      size:24,
      notNull:true
    },

  	name:{
  		type:'string',
  		required:true,
  		defaultsTo:'Sin nombre'
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
    },

    password:{
      type:'string',
      required:true
    },
    confirm_password:{
      type:'string',
      required:true
    },
    password_enc:{
      type:'string'
    },
    toJSON:function(){
    var obj=toObject();
    delete obj.password;
    delete obj._csrf;
    delete obj.confirm_password;
    return obj;
  }
},

  beforeCreate:function(values,next){
    var password=values.password;
    var confirm_password=values.confirm_password;
    // if(!password || !confirm_password || password!==confirm_password){
    //   var passwordDiferente=[{
    //     name:'passwordDiferente',
    //     message:'Las contraseñas deben coincidir'
    //   }];
    //   return next({
    //     error:passwordDiferente
    //   });
    // }else{
      values.password_enc=md5(values.password);
      values.password=null;
      values.password_enc=null;
      next();
    // }
  },


  validationMessages:{
    name:{
      string:'El nombre debe ser una cadena válida',
      required:'Ingresa tu nombre completo'
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
    },
    password:{
      string:'Ingresa una cadena valida',
      required:'Ingresa una contraseña'
    },
    confirm_password:{
      string:'Ingresar una cadena valida',
      required:'Confirma tu contraseña'
    }

  }
};


function GenerarId(){
  return Math.round(Math.random()*100000000000)+'u'+Math.round(Math.random()*10000);
}
