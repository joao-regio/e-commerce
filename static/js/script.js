const menuMobile = document.querySelector('.btn-menu-mobile img');
const nav = document.querySelector('#nav');
const btnShop = document.querySelector('.btn-loja');
const btnBackInitial = document.querySelector('footer button.voltar-inicio')
.addEventListener('click', ()=>{
	return false;
})

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

/*== Filtrar por categorias ==*/

//camisa
const shirt = document.querySelectorAll('.itens-loja .camisa');
const btnShirt = document.getElementById('selecionar-camisa');

//moletom
const sweatshirt = document.querySelectorAll('.itens-loja .moletom');
const btnSweatshirt = document.getElementById('selecionar-moletom');

//calça
const pants = document.querySelectorAll('.itens-loja .calca');
const btnPants = document.getElementById('selecionar-calca');

//todos os itens
const btnAllItems = document.getElementById('selecionar-tudo');

function getShirt(){
	//pegar camisas e selecionar os itens com a classe camisa na loja
	console.log('botão camisa');

	sweatshirt.forEach((item, index)=>{
		//retirar moletons
		sweatshirt[index].style.display = 'none';
	})

	pants.forEach((item, index)=>{
		//retirar calças
		pants[index].style.display = 'none';
	})

	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'block'
	})

}

function getSweatshirt() {
	//pegar moletons e selecionar os itens com a classe moletom na loja
	console.log('moletom clicado');

	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'none'
	})

	pants.forEach((item, index)=>{
		//retirar calças
		pants[index].style.display = 'none';
	})

	sweatshirt.forEach((item,index)=>{
		sweatshirt[index].style.display = 'block'
	})

}

function getPants() {
	//pegar calca e selecionar os itens com a classe calcas na loja
	console.log('calça clicada');

	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'none'
	})

	sweatshirt.forEach((item, index)=>{
		//retirar moletons
		sweatshirt[index].style.display = 'none';
	})

	pants.forEach((item, index)=>{		
		pants[index].style.display = 'block'
	})

}

function getAll(){
	//retornar os itens removidos
	console.log('botão todos clicado');

	shirt.forEach((item,index)=>{
		//remover camisas
		shirt[index].style.display = 'block'
	})

	sweatshirt.forEach((item, index)=>{
		//retirar moletons
		sweatshirt[index].style.display = 'block';
	})

	pants.forEach((item, index)=>{		
		pants[index].style.display = 'block'
	})
}

btnShirt.addEventListener('click', getShirt);
btnSweatshirt.addEventListener('click', getSweatshirt);
btnPants.addEventListener('click', getPants);
btnAllItems.addEventListener('click', getAll);
