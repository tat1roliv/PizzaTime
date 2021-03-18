console.log(pizzaJson);

const selectHtml = (elemento)=>{
    return document.querySelector(elemento);
}
const selectHtmlAll = (elemento)=>{
    return document.querySelectorAll(elemento);
}

pizzaJson.map((item, index) => {
    //clona a estrutura do html
    let pizzaItem = selectHtml(".models .pizza-item").cloneNode(true);

    //puxando dados do Json
    //imagem
    pizzaItem.querySelector('pizza-item--img img').src= item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);
    


});