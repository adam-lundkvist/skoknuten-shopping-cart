// Initierar kundvagnen.
let cart = {};
function initCart() {
    for (const product of products) {
        cart[product.name] = 0;
    }
}

// Ökar antalet av produktens namn och renderar om varukorgen. 
function increment(name) {
    if (cart[name] < 10) {
    cart[name]++;
    renderCart();
    }
}

function decrement(name) {
    if (cart[name] > 0) {
    cart[name]--;
    }
    renderCart();
}

document.getElementsByTagName("body")[0].style.overflowY = "scroll";

// Öppna kundvagn.
const openCartBtn = document.getElementById("open-cart");
const cartEl = document.getElementsByClassName("cart")[0];
openCartBtn.addEventListener("click", function() {
    cartEl.style.display = "block";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
});

const closeCartBtn = document.getElementsByClassName("close-cart")[0];
closeCartBtn.addEventListener("click", function() {
    cartEl.style.display = "none";
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
});


// Vid klick utanför kundvagnen stängs den ner.
document.addEventListener("mouseup", function(e) {
    if (!cartEl.contains(e.target)) {
        cartEl.style.display = 'none';
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }
});

// Produkterna skrivs ut från arrayen i filen products.js.
function renderProducts() {
    const shopContainer = document.querySelector(".shop-content");
    for (const product of products) {
        const productImg = product.image;
        const productName = product.name;
        const productPrice = product.price;        
        const template = `
            <img class="product-img" src="${productImg}">
            <h2 class="product-name">${productName}</h2>
            <span class="price">${productPrice} kr</span>
            <div class="add-to-cart-div">
            <button type="button" class="add-to-cart">Add To Cart</button>
            </div> 
            `;
        const item = document.createElement("div");
        item.classList.add("product-box");
        item.innerHTML = template;
        const buyButton = item.querySelector(".add-to-cart")
        buyButton.addEventListener("click", function() {
            increment(product.name);
            renderAnimations(buyButton);
            totalPrice();
        });
        shopContainer.appendChild(item);
    }
}

function renderAnimations(buyButton) {
    const buttonClicked = buyButton;
    const cartIcon = document.getElementById("open-cart");
    if (buttonClicked.classList != "add-to-cart-animation") {
    buttonClicked.classList.add("add-to-cart-animation");
    cartIcon.classList.add("open-cart");
    }
    setTimeout(function() {
        buttonClicked.classList.remove("add-to-cart-animation");
        cartIcon.classList.remove("open-cart");
    },2000);
}

// Vid knapptryck "köp" så läggs rätt produkt in i kundvagnen.
function renderCart() {
    const cartContainer = document.querySelector(".cart-content"); 
    cartContainer.innerHTML = ""; 
    for (const product of products) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-product-box");
        const amount = cart[product.name];
        const cartProductImg = product.image;
        const cartProductName = product.name; 
        const productPrice = amount * product.price; 
        if (amount > 0) {
            cartItem.innerHTML = 
            `
            <div class="cart-product-content">
                <div class="cart-image-div">
                    <img class="cart-img" src="${cartProductImg}">
                </div>
                <div class="cart-text-div">
                    <h3 class="cart-product-name">${cartProductName}</h3>
                    <span class="cart-product-price">${productPrice} kr</span>
                </div>
            </div>
                <div class="icon-container">
                <i class="fa-solid fa-circle-minus icons decrement"></i>
                <span class="product-amount">${amount}</span>
                <i class="fa-solid fa-circle-plus icons increment"></i>
                <i class="fa-solid fa-circle-xmark icons remove-item"></i>
            </div>
            `; 
            cartContainer.appendChild(cartItem);
            cartItem.querySelector(".increment").addEventListener("click", () => increment(product.name)); 
            cartItem.querySelector(".decrement").addEventListener("click", () => decrement(product.name)); 
            cartItem.querySelector(".remove-item").addEventListener("click", () => removeItem(product.name));
        } 
        
        if (amount === 10) {
            cartItem.querySelector(".increment").style.color = "gray";
            cartItem.querySelector(".increment").style.cursor = "auto";
        }
    }
    totalPrice();
}

// Funktion som tar bort produkt från kundvagnen.
function removeItem(name) {
    cart[name] = 0;
    renderCart();
}

// Funktion som visar totalt pris. 
function totalPrice() {
    // Totala priset hämtas och räknas ut.
    const cartBoxes = document.getElementsByClassName("cart-product-box"); 
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        const cartBox = cartBoxes[i];
        const priceEl = cartBox.getElementsByClassName("cart-product-price")[0].textContent;
        const quantityEl = cartBox.getElementsByClassName("product-amount")[0].textContent;
        const price = parseFloat(priceEl.replace("kr", ""));
        totalPrice = totalPrice + price;
        totalQuantity = totalQuantity + parseFloat(quantityEl);
    }
    document.getElementById("summary").innerHTML = `Total Price: ${totalPrice} kr`;
    cartQuantity(totalQuantity);
}

function cartQuantity(totalQuantity) {
    const cartContentEl = document.getElementsByClassName('cart-content')[0];
    if (cartContentEl.querySelector(".cart-product-box") !== null) {
        document.getElementById("quantity").style.display = "block";
        document.getElementById("quantity").textContent = totalQuantity;
    } else {
        document.getElementById("quantity").style.display = "none";
    }
}

// Funktion som rensar kundvagn. 
function clearCart() {
    const cartContainer = document.querySelector(".cart-content"); 
    if (cartContainer.querySelector(".cart-product-box") == null) {
        document.getElementById("summary").innerHTML = `The cart is already empty.`;        
    } else {
        initCart();
        renderCart();
    }
}

function checkOut() {
    const cartContainer = document.querySelector(".cart-content"); 
    if (cartContainer.querySelector(".cart-product-box") !== null) {
        initCart();
        renderCart();
        document.getElementById("summary").innerHTML = `Thank you! Your order has been recieved.`;        
    } else {
        document.getElementById("summary").innerHTML = `The cart is empty. Please add a product.`;
    }
}

window.onload = function() {
    initCart();
    renderProducts(); 
}
