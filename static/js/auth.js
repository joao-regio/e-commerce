const showFirstPasswd = document.querySelector('img[name=show-first-password]');
const firstPasswdInput = document.querySelector('input[name=primeiraSenha]');
const secondPasswdInput = document.querySelector('input[name=confirmarSenha]');
const showSecondPasswd = document.querySelector('img[name=show-second-password]');
const form = document.getElementById('form');
const emailUser = document.querySelector("input[name=emailNewUser]");
const username = document.querySelector("input[name=username]");
const lastname = document.querySelector('input[name=lastname]');
const firstPasswd = document.querySelector('input[name=primeiraSenha]')
const confirmPasswd = document.querySelector('input[name=confirmarSenha]')
const errorPasswd = document.querySelector('.erro-senha p');
const errorAge = document.querySelector('.erro-idade p')
const btn = document.querySelector('button[name=criarConta]')
const age = document.querySelector('input[name=idade]');

function EnterKeyFilter(){  
  if (window.event.keyCode == 13)
  {   
      event.returnValue = false;
      event.cancel = true;
  }
}


showFirstPasswd.addEventListener('click', ()=>{	
	showFirstPasswd.classList.toggle('show');
	if(showFirstPasswd.classList.contains('show')){
		//mudar input para texto
		showFirstPasswd.src = "/static/images/icons/olho-fechado.png";
		firstPasswdInput.type = "text";
	}else{
		//mudar input para password
		showFirstPasswd.src = "/static/images/icons/olho-aberto.png";
		firstPasswdInput.type = "password";
	}
})

showSecondPasswd.addEventListener('click',()=>{
	showSecondPasswd.classList.toggle('show');
	if(showSecondPasswd.classList.contains('show')){
		//mudar input para texto
		showSecondPasswd.src = "/static/images/icons/olho-fechado.png";
		secondPasswdInput.type = "text";
	}else{
		//mudar input para password
		showSecondPasswd.src = "/static/images/icons/olho-aberto.png";
		secondPasswdInput.type = "password";
	}
})


btn.addEventListener("click",(e)=>{

	if (firstPasswd.value != confirmPasswd.value || firstPasswd.value === "" || confirmPasswd.value === ""){
		e.preventDefault();
		errorPasswd.innerHTML = "";
		errorPasswd.innerHTML += "As senhas são incompatíveis";
		firstPasswd.classList.add('erro');
		confirmPasswd.classList.add('erro');
		firstPasswd.value = "";
		confirmPasswd.value = "";
	}else{
		errorPasswd.innerHTML = "";
		firstPasswd.classList.remove('erro');
		confirmPasswd.classList.remove('erro');
	}


	if (age.value < 14) {
		e.preventDefault();
		errorAge.innerHTML = "";
		errorAge.innerHTML += "Você tem que conter no mínimo 14 anos";
		age.classList.add('erro')
		age.value = "";

		successAlert.style.display = 'none';
		dangerAlert.style.display = 'block';
	}else{
		errorAge.innerHTML = "";
		age.classList.remove('erro');
	}

})

