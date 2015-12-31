/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	new:function(req,res){
		res.view('nuevoUsuario');
	},
	create:function(req,res){
		var objUser={
			name:req.param('name'),
			last_name:req.param('last_name'),
			username:req.param('username'),
			email:req.param('email'),
			password:req.param('password'),
			confirm_password:req.param('confirm_password')
		}

		User.create(objUser,function(error,user){
			if(error){
				res.json(Mensajes(error));
			}else{
				res.ok("ok");
			}
		})
	},
	listar:function(req,res){
		User.find({}).exec(function findb(error,lista){
			console.log(lista);
			res.view('listaUsuarios',{lista:lista});
		});
	},

	editar:function(req,res,next){
		User.findOne(req.param('id'),function(error,user){
			if(error){
				res.json({msj:error});
			}
			if(user){
				res.view('editarUsuario',{user:user});
			}else if(!user){
				return next();
			}
		});

	},

	actualizar:function(req,res,next){
		var objUser={
			name:req.param('name'),
			last_name:req.param('last_name'),
			username:req.param('username'),
			email:req.param('email')
		}
		User.update(req.param('id'),objUser,function(error,user){
			if(error){
				res.json(Menssajes(error));
			}else{	
				res.ok('ok');
			}
		});
	}


};

/**
 * Controla los mensajes de error
 * @param {[type]} error [Parametro que contiene el objeto de errores que asu ves dentro de una de sus propiedades contiene un array]
 */
function Mensajes(error){
	var errores=[];
	var propiedades=Object.getOwnPropertyNames(error.Errors);
	
	propiedades.map(function(index, elem) {
		for (var i = 0; i < error.Errors[index].length; i++) {
			errores.push(error.Errors[index][i]);
		};
	});
	return errores;
}
