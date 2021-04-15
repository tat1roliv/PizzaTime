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

selectHtml('.menu-openner').addEventListener('click', () =>{
    if( cart.length > 0){
        selectHtml('aside').style.left = '0';   
    }
});
selectHtml('.menu-closer').addEventListener('click', () => {
    selectHtml('aside').style.left = '100vw';   
});

function updateCart(){

    selectHtml('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0){
        selectHtml('aside').classList.add("show");
        selectHtml('.cart').innerHTML = '';


        let subtotal = 0;
        let desconto = 0;
        let total = 0;


        for (let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = selectHtml('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;



            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else{
                    cart.splice(i, 1);
                } 
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
                cart[i].qt++;
                updateCart();
            });

            selectHtml('.cart').append(cartItem);
        }

        desconto =  subtotal * 0.1;
        total = subtotal - desconto;

        selectHtml('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selectHtml('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        selectHtml('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        selectHtml('aside').classList.remove("show");
        selectHtml('aside').style.left = '100vw';
    }
}
