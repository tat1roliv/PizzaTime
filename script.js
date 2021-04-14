//console.log(pizzaJson);

let modalQt = 1;

const selectHtml = (el)=>{
    return document.querySelector(el);
}
const selectHtmlAll = (el)=>{
    return document.querySelectorAll(el);
}

//listagem das pizzas
pizzaJson.map((pizza, index) => {
    //clona a estrutura do html
    let pizzaItem = selectHtml(".models .pizza-item").cloneNode(true);
 
    //puxando dados do Json p janela por id da pizza //armazenar pizza clicada
    pizzaItem.setAttribute('data-key', index);

    //puxando dados do Json
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    
    //janela pizza
    pizzaItem.querySelector('a').addEventListener('click', (event)=>{ 
        event.preventDefault();
        modalQt = 1;
        //console.log("clicou");
        let key = event.target.closest('.pizza-item').getAttribute('data-key');

        //preenchendo dados da janela
        selectHtml('.pizzaBig img').src = pizzaJson[key].img;
        selectHtml('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectHtml('.pizza-item--desc').innerHTML = pizzaJson[key].description;
        selectHtml('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        selectHtml('.pizzaInfo--size.selected').classList.remove('selected');
        selectHtmlAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
            if (sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            
        });

        selectHtml('.pizzaInfo--qt').innerHTML = modalQt;

        //console.log("pizza clicada"+key);
        //console.log(pizzaJson[key]);

        selectHtml('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectHtml('.pizzaWindowArea').style.opacity = 0;
        selectHtml('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{
            selectHtml('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });

    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);

});

//eventos do modal
function closeModal(){
    selectHtml('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        selectHtml('.pizzaWindowArea').style.display = 'none';

    }, 500);
}

selectHtmlAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});