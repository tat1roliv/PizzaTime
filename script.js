//console.log(pizzaJson);

const selectHtml = (el)=>{
    return document.querySelector(el);
}
const selectHtmlAll = (el)=>{
    return document.querySelectorAll(el);
}

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
        //console.log("clicou");
        let key = event.target.closest('.pizza-item').getAttribute('data-key');

        console.log("pizza clicada"+key);
        //console.log(pizzaJson[key]);

        //selectHtml('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectHtml('.pizzaWindowArea').style.opacity = 0;
        selectHtml('.pizzaWindowArea').style.display = 'flex';

        setTimeout(()=>{
            selectHtml('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });

    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);


    

});