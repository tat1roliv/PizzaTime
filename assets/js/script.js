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
    //preenche dados
    selectHtml(".pizza-area").append(pizzaItem);
    //imprimir

});