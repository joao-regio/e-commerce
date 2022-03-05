const menuMobile = document.querySelector('.btn-menu-mobile img');
const nav = document.querySelector('#nav');


function openMenuMobile(event){

	//verificar o tipo de evento para não ocorrer o bug de clicar duas vezes no botão
	if(event.type === 'touchstart'){
		event.preventDefault();
	}

	//ao clicar no botão abrir menu mobile
	nav.classList.toggle('active')

	//quando nav tiver a classe active mudar img para o botão X
	if(nav.classList.contains('active')){
		menuMobile.src= "/static/images/icons/botao-x.png";
	}else{
		menuMobile.src = "/static/images/icons/menu-bar.png";
	}

}

menuMobile.addEventListener('click', openMenuMobile)
menuMobile.addEventListener('touchstart', openMenuMobile)
