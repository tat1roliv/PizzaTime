//console.log(pizzaJson);

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
    pizzaItem.querySelector('.pizza-item--name').innerHtml = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHtml = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHtml = `R$ ${item.price.toFixed(2)}`;

    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);
    


});