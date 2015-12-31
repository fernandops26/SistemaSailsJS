

$(document).on('ready',function(){
	$('#formCrear').on('submit',function(){

// document.addEventListener('DOMContentLoaded',function(){

// 	var form=document.getElementById('formCrear').addEventListener('submit',function(){

		// var obj={
		// 	name:document.getElementsByName('name').value,
		// 	last_name:document.getElementsByName('last_name').value,
		// 	username:document.getElementByName('username').value,
		// 	email:document.getElementByName('email').value
		// }
		
		var obj=$(this).serialize();

		$.post('/user/create',obj,function(res){
			mostrarMensaje(res);
		});
		return false;
	});


});

function mostrarMensaje(res){

	var men=document.getElementById('mensaje');
	if(res==="ok"){
		var li =document.createElement('li');
			li.innerHTML="Registrado Correctamente"
			men.appendChild(li);
			men.className="mensaje mensaje__satisfactorio mensaje__activo";
			limpiarCajas();
	}else{
		if(res.length>0){

			for (var i = 0; i < res.length; i++) {
				var li =document.createElement('li');
				li.innerHTML=res[i].message;
				li.className="mensaje__item";
				men.appendChild(li);
			}
			men.className="mensaje mensaje__error mensaje__activo";
		}
	}
	


	setTimeout(function(){
		while(men.hasChildNodes()){
			men.removeChild(men.firstChild);
		}
		men.className="mensaje";

	},3000);
}

function limpiarCajas(){
	var cajas=document.getElementsByClassName('contenedor__caja');
	for (var i = 0; i < cajas.length;i++) {
		cajas[i].value="";
	}
}