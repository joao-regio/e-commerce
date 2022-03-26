const img = document.querySelector("img");
const inputPasswd = document.querySelector('input[name=senha]');

img.addEventListener('click', ()=>{	
	img.classList.toggle('show');
	if(img.classList.contains('show')){
		//mudar input para texto
		img.src = "/static/images/icons/olho-fechado.png";
		inputPasswd.type = "text";
	}else{
		//mudar input para password
		img.src = "/static/images/icons/olho-aberto.png";
		inputPasswd.type = "password";
	}
})