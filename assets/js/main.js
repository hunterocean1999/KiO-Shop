let carts = document.querySelectorAll('.home-product__content-buy')
//Goi moi khi click vao nut mua

 let products = [
     {
         name: 'Nike Shoes',
         price: 200,
         color: 'red',
         inCart: 0
     },
     {
        name: 'Adidas Shoes',
        price: 250,
        color: 'red',
        inCart: 0
    },
    {
        name: 'Vans Shoes',
        price: 150,
        color: 'red',
        inCart: 0
    },
    {
        name: 'Ananas Shoes',
        price: 30,
        color: 'red',
        inCart: 0
    }
 ];

for(let i = 0; i <carts.length;i++){
    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
       
        document.querySelector('.header__cart-notice').textContent = productNumbers;
   }
}


//Ham de tinh tong so luong của cart
function cartNumbers(product){
   
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
         localStorage.setItem('cartNumbers',productNumbers +1);
         document.querySelector('.header__cart-notice').textContent = productNumbers +1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.header__cart-notice').textContent = 1;
    }
    setItem(product);
}


// Hàm để tính số lượng từng sản phẩm và lấy các giá trị của nó theo dạng đối tượng
function setItem(product){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name] : product
            }
        }
        cartItems[product.name].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
            [product.name] : product
        }
    }

    localStorage.setItem("productInCart",JSON.stringify(cartItems));
}


//Hàm để tính tổng toàn bộ giỏ hàngs
function totalCost(product){
    let total = localStorage.getItem("productPrice");

    if(total != null){
        total = parseInt(total);
        localStorage.setItem("productPrice", total + product.price);
    }else{
        localStorage.setItem("productPrice", product.price);
    }
}

function disPlayCart(){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let totalPrice = localStorage.getItem("productPrice")

    let productContainer = document.querySelector(".products");

    if(cartItems && productContainer){
        productContainer.innerHTML = ' ';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
                <span class="products__list-name">${item.name}</span>
                <span class="products__list-price">$${item.price},00</span>
                <span class="products__list-quantity">${item.inCart}</span>
                <span class="products__list-total">$${item.inCart * item.price},00</span>
            `
        });
        productContainer.innerHTML += `
            <div class="products__total-order">
                <h5 class="products__total-order-title">
                     Total orders 
                </h5>

                <h5 class="products__total-order-cost">
                    $${totalPrice},00
                </h5>
            </div>
        `
    }
}

onLoadCartNumber();//Khi load lại sẽ k bị mất dữ liệu
disPlayCart()