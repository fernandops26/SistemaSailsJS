/**
 * LibroController
 *
 * @description :: Server-side logic for managing libroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listar:function(req,res){

		var datos={
			libros:{},
			total:0,
			title:"Libros"
		};

		Libro.find({}).paginate({page:1, limit:5}).exec(function(err,libros){

			datos.libros=libros;

			Libro.find({}).exec(function(err,libros){
			datos.total=libros.length;

				return res.view('Libro/libros',datos);
			});

		});
	},

	agregar:function(req,res){
		console.log('---'+req);
		var objLibro={
			titulo:req.param('titulo'),
			detalle:req.param('detalle')
		};
		Libro.create(objLibro,function(err,libro){
			if(err){
					console.log(err);
					return res.json(err);
			}else{
					return res.send("ok");
			}
		});
	},

	filtrar:function(req,res){
		var titulo=req.param('titulo');
		var detalle=req.param('detalle');
		var pagina=req.param('pagina');

		var datos={
			libros:{},
			total:0
		};

		Libro.find({titulo:{'like':'%'+titulo+'%'},detalle:{'like':'%'+detalle+'%'}}).paginate({page:pagina, limit:5}).exec(function(err,libros){

			datos.libros=libros;

			Libro.find({}).exec(function(err,libros){
			datos.total=libros.length;

				return res.json(datos);
			});

		});





	}
};
