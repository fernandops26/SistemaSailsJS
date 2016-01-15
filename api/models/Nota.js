/**
* Nota.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	titulo:{
  		type:'string',
  		required:true,
  		size:30
  	},

  	contenido:{
  		type:'string',
  		required:true,
  		size:140
  	},

  	libro:{
  		model:"Libro"
  	}


  }
};
