const menuMobile = document.querySelector('.btn-menu-mobile img');
const nav = document.querySelector('#nav');


function openMenuMobile(event){

	//verificar o tipo de evento para não ocorrer o bug de clicar duas vezes no botão
	if(event.type === 'touchstart'){
		event.preventDefault();
	}

	//ao clicar no botão abrir menu mobile
	nav.classList.toggle('active');

	//quando nav tiver a classe active mudar img para o botão X
	if(nav.classList.contains('active')){
		menuMobile.src= "/static/images/icons/botao-x.png";
	}else{
		menuMobile.src = "/static/images/icons/menu-bar.png";
	}

}

menuMobile.addEventListener('click', openMenuMobile);
menuMobile.addEventListener('touchstart', openMenuMobile);


//quando o usuário clicar nos botões relevantes as categorias de roupas da loja filtrar por categorias
//então quando clicar em camisa aparecer só camisas, quando clicar em moletom aparecer só moletom e assim por diante

//camisa
const shirt = document.querySelectorAll('.itens-loja .camisa');
const btnShirt = document.getElementById('selecionar-camisa');

//moletom
const sweatshirt = document.querySelectorAll('.itens-loja .moletom');
const btnSweatshirt = document.getElementById('selecionar-moletom');

//calça
const pants = document.querySelectorAll('.itens-loja .calca');
const btnPants = document.getElementById('selecionar-calca');


function getShirt(){
	//pegar camisas e selecionar os itens com a classe camisa na loja
	sweatshirt.forEach((item, index)=>{
		//retirar moletons
		sweatshirt[index].style.display = 'none';
	})

	pants.forEach((item, index)=>{
		//retirar calças
		pants[index].style.display = 'none';
	})

	if(shirt.style.display === 'none'){
		shirt.forEach((item, index)=>{
			shirt[index].style.display = 'flex';
		})
	}

}

function getSweatshirt() {
	//pegar moletons e selecionar os itens com a classe moletom na loja
	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'none'
	})

	pants.forEach((item, index)=>{
		//retirar calças
		pants[index].style.display = 'none';
	})

	if(sweatshirt.style.display === 'none'){
		sweatshirt.forEach((item, index)=>{
			sweatshirt[index].style.display = 'flex';
		})
	}
}

function getPants() {
	//pegar calca e selecionar os itens com a classe calcas na loja
	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'none'
	})

	sweatshirt.forEach((item, index)=>{
		//retirar moletons
		sweatshirt[index].style.display = 'none';
	})

	if(spants.style.display === 'none'){
		pants.forEach((item, index)=>{
			pants[index].style.display = 'flex';
		})
	}
}


btnShirt.addEventListener('click', getShirt);
btnSweatshirt.addEventListener('click', getSweatshirt);
btnPants.addEventListener('click', getPants);