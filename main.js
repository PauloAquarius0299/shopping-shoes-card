import products from "./products.js";
// Assuming the 'iconBtn' is declared somewhere else in your code
// let iconBtn = document.querySelector('.iconBtn'); 

const main = () => {
    // Declare 'cart' array to store products in the cart
    let cart = [];
    
    // Assuming 'iconCart' and 'iconBtn' are declared somewhere else in your code
    let iconCart = document.querySelector('.icon-cart');
    let iconBtn = document.querySelector('.iconBtn');
    let closeBtn = document.querySelector('.cartTab .close');
    let body = document.querySelector('body');
    
    // Event listeners for opening/closing the cart
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });
    closeBtn.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });
    
    // Function to add/update product in the cart
    const setProductInCart = (idProduct, quantity, position) => {
        if (quantity > 0) {
            if (position < 0) {
                cart.push({
                    product_id: idProduct,
                    quantity: quantity,
                });
            } else {
                cart[position].quantity = quantity;
            }
        }else{
            cart.splice(position, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        refreshCartHTML();
    };
    
    // Function to refresh the cart HTML
    const refreshCartHTML = () => {
        let listHTML = document.querySelector('.listCart');
        let totalHTML = document.querySelector('.icon-cart span');
        let totalQuantity = 0;
        
        // Clear the cart list before updating
        listHTML.innerHTML = '';
        
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let position = products.findIndex((value) => value.id == item.product_id)
            let info = products[position];
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML =
                `
                <div class="image">
                    <img src="${info.image}" />
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$
                ${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class='minus' data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class='plus' data-id="${info.id}" >+</span>
                </div>
                `;
            listHTML.appendChild(newItem);
        });
        totalHTML.innerHTML = totalQuantity;
    };
    
    // Event listener for adding products to the cart
    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let position = cart.findIndex((value) => value.product_id == idProduct);
        let quantity = position < 0 ? 0 : cart[position].quantity;
    
        if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')) {
            quantity++;
            setProductInCart(idProduct, quantity, position);
        }else if(buttonClick.classList.contains('minus')){
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
    });
    const initApp = () => {
        if(localStorage.getItem('cart')){
            cart = JSON.perse(localStorage.getItem('cart'));
        }
        refreshCartHTML();
    }
    initApp();
};

export default main;
