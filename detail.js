import products from "./products.js";
import main from "./main.js";
let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

const loadTemplate = () => {
    fetch('/index.html')
    .then(response => response.text())
    .then(html => {
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        cart();
        initApp();
    })
}
loadTemplate();
const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter((value) => value.id == idProduct)[0];
    console.log(info);
    if(!info){
        window.location.href='/';
    }
    let detail = document.querySelector('.detail');
    detail.querySelector('image img').src = info.image;
    detail.querySelector('.name').innerHTML = info.name;
    detail.querySelector('.price').innerHTML = '$'+ info.price;
    detail.querySelector('.description').innerHTML = info.description;
    detail.querySelector('.addCart').dataset.id = idProduct;

    let listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML = null;
    products.filter((value) => value.id != idProduct).forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `
        <a href="/detail.html?id=${product.id}" >
        <img src="${product.image}"/>
        </a>
        
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart"
        data-id='${product.id}'>
            add ao Carrinho
        </button>
        `;
        listProduct.appendChild(newProduct);
    })
}
