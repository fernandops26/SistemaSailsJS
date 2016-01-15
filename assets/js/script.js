

$(document).on('ready',function(){
	$('#formCrear').on('submit',function(){


		/**
		 * [objeto json que tiene todos los valores de los elementos dentro del formulario que van a ser enviados]
		 */
		var obj=$(this).serialize();

		/**
		 * [envia los valores mediante ajax a '/user/create' y delega la respuesta a la funcion mostrarMensaje]
		 * @param (res) [respuesta del servidor]
		 */
		$.post('/user/create',obj,function(res){
			mostrarMensaje(res);
		});
		return false;
	});

	var clase_form_login=document.getElementsByClassName('login__formulario--aparte');
	var clase_form_registro=document.getElementsByClassName('registro__formulario--aparte');

	if(clase_form_login.length>0){
		clase_form_login[0].addEventListener('submit',function(evento){
			evento.preventDefault();
			var objLogin=$(this).serialize();
			// $.ajax({
	 	// 		url: '/loguear',
	 	// 		type: 'POST',
	 	// 		dataType: 'json' ,
	 	// 		data: objLogin,
	 	// 		success: function(data){
	 	//
	 	// 		}
			// 	});

			$.post('/loguear', objLogin, function(data) {
			mostrarMensaje(data,'login');
	});




		});
	}


	if(clase_form_registro.length>0){
		clase_form_registro[0].addEventListener('submit',function(evento){
			evento.preventDefault();
			var objRegistro=$(this).serialize();
			// $.ajax({
			// 	url: '/registrar',
			// 	type: 'POST',
			// 	dataType: 'json' ,
			// 	data: objRegistro,
			// 	success: function(data){
			// 			mostrarMensaje(data,'registro');
			// 	}
			// });

			$.post('/registrar', objRegistro, function(data) {
				mostrarMensaje(data,'registro');
		});


		});
	}


















	/**
	 * [capturar todas las variables que sirven para jugar con el menu]
	 */
	var menu=document.getElementById('menu_principal');
	var menu_cerrar=document.getElementById('contenedor__menu__cerrar');
	var links_menu=document.getElementsByClassName('menu__link');
	var icono__menu=document.getElementById('icono__menu');
	var contenedor__menu=icono__menu.parentNode.nextSibling;
	var contenido_general=document.getElementById('contenido_general');
	var contenedor__formularios__agregar=document.getElementsByClassName('contenedor__formulario__agregar');
	var contenedores__formulario=document.getElementsByClassName("contenedor__formulario");
	var gestion=document.getElementById('gestion');
	var paginacion__items=document.getElementsByClassName('paginacion__item');



	var login_link_registro=document.getElementById('login_link_registro');
	var registro_link_iniciar_sesion=document.getElementById('registro_link_iniciar_sesion');




	/**
	 * [variable que verifica el estado del menu]
	 * {0=cerrado}/{1=abierto}
	 */
	var contador_menu=0;

	/**
	 * [evento al hacer click en el menu especificamente en el icono del menu]
	 * if(contador_menu===0) [verifica si esta cerrado el menu] //aplica clases
	 * contador_menu++/contador_menu-- [incrementa o decrementa el estado para abrir o cerrar el menu en el proximo evento click]
	 */
	 icono__menu.addEventListener('click',function(){
	 	if(contador_menu===0){
	 	contenedor__menu.className="contenedor__menu contenedor__menu--activo";
	 	this.className="icono__menu icono__menu--activo icon-menu-movil";
	 	contenido_general.className="contenido_general contenido_general--con_menu";

	 	// for (var i = 0; i< contenedor__formularios.length; i++) {
	 	// 	contenedor__formularios[i].className="contenedor__formulario contenedor__formulario--con_menu";
	 	// };

	 	contador_menu++;
	 	}else{
	 		contenedor__menu.className="contenedor__menu ";
	 		this.className="icono__menu icon-menu-movil";
	 		contenido_general.className="contenido_general";

	 		// for (var i = 0; i< contenedor__formularios.length; i++) {
	 		// 	contenedor__formularios[i].className="contenedor__formulario";
	 		// };

	 		contador_menu--;
	 	}
	 });

	 /**
	  * [recorre cada link del MENU para asignarle el evento click]
	  * if(this.nextSibling!=null) [verifica si el link actual(nodo a) contiene algun elemento hermano, en este caso un submenu(nodo ul)]
	  */
	for (var i =0; i < links_menu.length; i++) {
		links_menu[i].addEventListener('click',function(){
			if(this.nextSibling!=null){
				menu.className="menu menu--oculto";
				menu_cerrar.className="contenedor__menu__cerrar contenedor__menu__cerrar--mostrar icon-casa";
				this.nextSibling.className="submenu submenu--activo";
				icono__menu.className="icono__menu icono__menu--suspendido icon-menu-movil";
			}

		});
	}

	/**
	 * [evento que se ejecuta al hacer click en el icono cerrar del submenu(icono de la casa)]
	 * var submenus [se obtienen todos los submenus que esten activos, es decir abiertos]
	 * for (var i =0; i < submenus.length; i++) [recorre todas la lista de submenus abiertos para cerrarlos]
	 */
	menu_cerrar.addEventListener('click',function(){
		menu.className="menu";
		this.className="contenedor__menu__cerrar";
		var submenus=document.getElementsByClassName('submenu--activo');
		icono__menu.className="icono__menu icono__menu--activo icon-menu-movil";
		for (var i =0; i < submenus.length; i++) {
			submenus[0].className="submenu";
		}

	});



	var boton__libro__nuevo=document.getElementById('boton__libro--nuevo');

	if(boton__libro__nuevo){
		boton__libro__nuevo.addEventListener('click', function(){
		actDesGestion();
		for (var i = 0; i< contenedor__formularios__agregar.length; i++) {
	 			contenedor__formularios__agregar[i].className="contenedor__formulario  contenedor__formulario__agregar--activo";
	 		}
		});
	}


	var formulario__boton__cancelar=document.getElementsByClassName('formulario__boton--cancelar');
	if(formulario__boton__cancelar){
		for (var k = 0; k < formulario__boton__cancelar.length; k++) {
	 		formulario__boton__cancelar[k].addEventListener('click',function(){
	 			actDesGestion();
	 			var nodoFormulario=this.parentNode.parentNode;
					console.log(nodoFormulario.className.substring(0,nodoFormulario.className.indexOf('-')));
	 			nodoFormulario.className=nodoFormulario.className.substring(0,nodoFormulario.className.indexOf('-'));
	 			filtrarDatos('','',1);
	 		});
	 	}
	}



	 	var formulario__agregar__libro=document.getElementById('formulario__agregar__libro');
	 	if(formulario__agregar__libro){
	 		formulario__agregar__libro.addEventListener('submit',function(evento){
	 		evento.preventDefault();
	 		var objLibro=$(this).serialize();
	 		console.log(objLibro);

	 		// $.post('/libro/agregar', objLibro, function(data) {
	 		// 	if(data==="ok"){
	 		// 		alert("Correcto");
	 		// 	}
	 		// });
	 		//

	 		$.ajax({
	 			url: '/libro/agregar',
	 			type: 'POST',
	 			dataType: 'json' ,
	 			data: objLibro,
	 			success: function(data){
	 				if(data=="ok"){
	 					alert("Correcto");
	 				}
	 			}
	 		});

	 		actDesGestion();
	 			var nodoFormulario=this.parentNode;
	 			console.log(nodoFormulario.className.substring(0,nodoFormulario.className.indexOf('-')));
	 			nodoFormulario.className=nodoFormulario.className.substring(0,nodoFormulario.className.indexOf('-'));

	 			filtrarDatos('','',1);

	 		return false;
	 	});
	 	}




	 	for (var j = 0; j < paginacion__items.length ;j++) {
	 		paginacion__items[j].addEventListener('click',function(){

	 			filtrarDatos('','',this.dataset.npagina);
	 		});
	 	}


	 	var ii=document.getElementsByClassName('libro__contenido');
	 	if(ii.length>0){
	 		for (var i = 0; i <= ii.length; i++) {
		 		ii[i].addEventListener('click',function(){
		 		alert("click");
		 	});

	 		}
	 	}


if(registro_link_iniciar_sesion){
	registro_link_iniciar_sesion.addEventListener('click',function(evento){
		evento.preventDefault();
	 MostrarLoginRegistro(1);
	});
}

if(login_link_registro){
	login_link_registro.addEventListener('click',function(evento){
		evento.preventDefault();
	 MostrarLoginRegistro(2);
	});
}


	var cerrar_mensajes_login=document.getElementsByClassName('login__mensajes__cerrar');
	if(cerrar_mensajes_login.length>0){
		cerrar_mensajes_login[0].addEventListener('click',function(){
			this.parentNode.className="login__mensajes";
		});
	}

	var cerrar_mensajes_registro=document.getElementsByClassName('registro__mensajes__cerrar');
	if(cerrar_mensajes_registro.length>0){
		cerrar_mensajes_registro[0].addEventListener('click',function(){
			this.parentNode.className="registro__mensajes";
		});
	}




});


function mostrarMensaje(res,nombreClase){
console.log('repuesta: '+ res);
	var contenedor__mensajes=document.getElementsByClassName(nombreClase+"__mensajes");

	while (contenedor__mensajes[0].hasChildNodes()) {
		contenedor__mensajes[0].removeChild(contenedor__mensajes[0].firstChild);
	}

	var cerrar=document.createElement('div');
		cerrar.innerHTML='x';
		cerrar.className=nombreClase+'__mensajes__cerrar';

		contenedor__mensajes[0].appendChild(cerrar);

	if(contenedor__mensajes.length>0){
		if(res.resultado===1){
			var li =document.createElement('li');
				li.className=nombreClase+'__mensaje';
				li.innerHTML=res.message;
				contenedor__mensajes[0].appendChild(li);
				contenedor__mensajes[0].className=nombreClase+'__mensajes '+ nombreClase+'__mensajes--correcto';
				limpiarCajas();
		}else{
			if(res.length>0){
				for (var i = 0; i < res.length; i++) {
					var elemento_li = document.createElement('li');
					elemento_li.innerHTML=res[i].message;
					elemento_li.className=nombreClase+'__mensaje';
					contenedor__mensajes[0].appendChild(elemento_li);
				}
				contenedor__mensajes[0].className=nombreClase+'__mensajes '+ nombreClase+'__mensajes--error';
			}
		}

		var cerrar_mensajes_login=document.getElementsByClassName('login__mensajes__cerrar');
		if(cerrar_mensajes_login.length>0){
			cerrar_mensajes_login[0].addEventListener('click',function(){
				this.parentNode.className="login__mensajes";
			});
		}

		var cerrar_mensajes_registro=document.getElementsByClassName('registro__mensajes__cerrar');
		if(cerrar_mensajes_registro.length>0){
			cerrar_mensajes_registro[0].addEventListener('click',function(){
				this.parentNode.className="registro__mensajes";
			});
		}

	}



	setTimeout(function(){
		contenedor__mensajes[0].className=nombreClase+'__mensajes';
	},4000);



}


function limpiarCajas(){
	var cajas=document.getElementsByTagName('input');
	if(cajas.length>0){
		for (var i = 0; i < cajas.length;i++) {
			if(cajas.type=="text" || cajas.type=="password"){
				cajas[i].value="";
			}
		}
	}
}

function actDesGestion(){

	if(gestion.className=="gestion"){
		gestion.className="gestion--oculto";
	}else{
		gestion.className="gestion";
	}

}


function CrearListaDeLibros(datos){
	var listaLibros=document.getElementById('lista__libros');

		while(lista__libros.hasChildNodes()){
			lista__libros.removeChild(lista__libros.firstChild);
		}



		for (var i = 0; i < datos.libros.length; i++) {

			var item=datos.libros[i];

			var libro=document.createElement('li');
				libro.className="libro";
			var libro_dibujo=document.createElement('div');
				libro_dibujo.className="libro__dibujo icon-libro";
			var libro_contenido=document.createElement('div');
				libro_contenido.className="libro__contenido";
			var libro_creacion=document.createElement('label');
				libro_creacion.className="libro__creacion";
				libro_creacion.innerHTML="Creado:  " +item.fecha_creacion;//Fecha
			var libro_titulo=document.createElement('label');
				libro_titulo.className="libro__titulo";
				libro_titulo.innerHTML=item.titulo; //titulo
			var libro_detalle=document.createElement('p');
				libro_detalle.className="libro__detalle";
				libro_detalle.innerHTML=item.detalle; //detalle
			var libro_accciones=document.createElement("div");
				libro_accciones.className="libro__acciones";
			var libro_link_eliminar=document.createElement('a');
				libro_link_eliminar.className="libro__link libro__link--eliminar icon-basurero";
			var libro_link_editar=document.createElement('a');
				libro_link_editar.className="libro__link libro__link--editar icon-lapiz";
			var libro_link_nota=document.createElement('a');
				libro_link_nota.className="libro__link libro__link--nota icon-signo-mas";


				libro_contenido.appendChild(libro_creacion);
				libro_contenido.appendChild(libro_titulo);
				libro_contenido.appendChild(libro_detalle);

				libro_accciones.appendChild(libro_link_eliminar);
				libro_accciones.appendChild(libro_link_editar);
				libro_accciones.appendChild(libro_link_nota);

				libro.appendChild(libro_dibujo);
				libro.appendChild(libro_contenido);
				libro.appendChild(libro_accciones);

				lista__libros.appendChild(libro);
				libro=null;
		}



	var paginas=Math.ceil(datos.total/5);
	var paginacion=document.getElementsByClassName('paginacion');
	while(paginacion[0].hasChildNodes()){
		paginacion[0].removeChild(paginacion[0].firstChild);
	}

	for (var i = 1; i <= paginas; i++) {
		var paginacion__item=document.createElement('div');
			paginacion__item.className="paginacion__item";
			paginacion__item.npagina=i;
			paginacion__item.innerHTML=i;
			paginacion__item.dataset.npagina=i;
			paginacion[0].appendChild(paginacion__item);
			paginacion__item=null;
	}


	var paginacion__items=document.getElementsByClassName('paginacion__item');
	for (var i = 0; i < paginacion__items.length ;i++) {
	 		paginacion__items[i].addEventListener('click',function(){

	 			filtrarDatos('','',this.dataset.npagina);
	 		});
	 	}


	 login_link_registro.addEventListener('click',function(){

	 });



}


function filtrarDatos(titulo,detalle,pagina){
	var objFiltro={
		titulo:'',
		detalle:'',
		pagina:1
	};

	if(titulo){
		objFiltro.titulo=titulo;
	}
	if(detalle){
		objFiltro.detalle=detalle;
	}
	if(pagina){
		objFiltro.pagina=pagina;
	}
	$.ajax({
		url: '/libro/filtrar',
		type: 'GET',
		dataType: 'json',
		data: objFiltro
	})
	.done(function(datos) {
		CrearListaDeLibros(datos);

	 });
	// .fail(function() {
	// 	console.log("error");
	// })
	// .always(function() {
	// 	console.log("complete");
	// });


}


function MostrarLoginRegistro(numeroFormulario){
	var form_login=document.getElementById('login');
	var form_registro=document.getElementById('registro');

if(numeroFormulario==1){
	form_login.className="login";
	form_registro.className="registro registro--oculto";
}else{

	form_login.className="login login--oculto";
	form_registro.className="registro";
}

}
