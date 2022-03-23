const emailUser = document.querySelector("input[name=emailNewUser]");
const username = document.querySelector("input[name=username");
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

//se as validaçoes não der certo não enviar dados ao banco de dados


btn.addEventListener("click",(e)=>{
		
	let charPasswd = confirmPasswd.split('');
	

	if (firstPasswd.value != confirmPasswd.value || firstPasswd.value === "" || confirmPasswd.value === "" && charPasswd.length < 8){
		errorPasswd.innerHTML = "";
		errorPasswd.innerHTML += "As senhas são incompatíveis ou é pequena";
		firstPasswd.classList.add('erro');
		confirmPasswd.classList.add('erro');
	}else{
		errorPasswd.innerHTML = "";
		firstPasswd.classList.remove('erro');
		confirmPasswd.classList.remove('erro');
	}

	if (age.value < 14) {
		errorAge.innerHTML = "";
		errorAge.innerHTML += "A idade tem que maior que 14";
		age.classList.add('erro')
	}else{
		errorAge.innerHTML = "";
		age.classList.remove('erro')
	}

})