//console.log(pizzaJson);
let cart = [];
let modalQt = 1;
let modalKey = '0';

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
        let key = event.target.closest('.pizza-item').getAttribute('data-key'); 
        //reset qt
        modalQt = 1;
        //selected pizza
        modalKey = key;
        

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

//modal events
function closeModal(){
    selectHtml('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        selectHtml('.pizzaWindowArea').style.display = 'none';

    }, 500);
}

//btn to close
selectHtmlAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//btn++
selectHtml('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    selectHtml('.pizzaInfo--qt').innerHTML = modalQt;
    
});

//btn--
selectHtml('.pizzaInfo--qtmenos').addEventListener('click', () => {  
    if(modalQt > 1){
        modalQt--;
    }
    selectHtml('.pizzaInfo--qt').innerHTML = modalQt;
});

//pizza size
selectHtmlAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        selectHtml('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        
    });
    
});

//add cart info [type size how many]
selectHtml('.pizzaInfo--addButton').addEventListener('click', () =>{
    
    //console.log("pizza type"+modalKey); 
    let size = parseInt(selectHtml('.pizzaInfo--size.selected').getAttribute('data-key'));       
    //console.log("pizza type"+modalQt);

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item) =>{
        return item.identifier == identifier;
    });

    if( key > -1) {
        cart[key].qt += modalQt;
    } else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt

    });

    }
    updateCart();
    closeModal();

});

function updateCart(){
    if (cart.length > 0){
        selectHtml('aside').classList.add("show");

        for (let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            console.log(pizzaItem);
        }


    }else{
        selectHtml('aside').classList.remove("show");
    }
}
