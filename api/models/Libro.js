/**
* Libro.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	titulo:{
  		type:'string',
  		required:true,
  		size:50
  	},

  	detalle:{
  		type:'string',
  		required:false,
  		size:140
  	},

  	fecha_creacion:{
  		type:'datetime',
  		required:true,
  		defaultsTo:function(){return new Date().toLocaleString()}
  	},

  	notas:{
  		collection:"Nota",
  		via:'libro'
  	},

    beforeCreate:function(values,next){
      values.fecha_creacion=function(){return new Date().toLocaleString()};
    }

  }
};

