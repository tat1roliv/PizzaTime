console.log(pizzaJson);

const selectHtml = (elemento)=>{
    return document.querySelector(elemento);
}
const selectHtmlAll = (elemento)=>{
    return document.querySelectorAll(elemento);
}

pizzaJson.map((pizza, index) => {
    //clona a estrutura do html
    let pizzaItem = selectHtml(".models .pizza-item").cloneNode(true);

    //puxando dados do Json
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;

    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);


});