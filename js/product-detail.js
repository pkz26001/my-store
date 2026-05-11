// Product Detail Page

let currentProduct = null;

window.addEventListener('load', function() {
    loadProductDetail();
});

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }
    
    document.getElementById('product-image').src = currentProduct.image;
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-price').textContent = formatPrice(currentProduct.price);
    document.getElementById('product-description').textContent = currentProduct.description;
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = cart.find(item => item.id === currentProduct.id);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: quantity,
            image: currentProduct.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

function increaseQuantity() {
    const quantity = document.getElementById('quantity');
    quantity.value = parseInt(quantity.value) + 1;
}

function decreaseQuantity() {
    const quantity = document.getElementById('quantity');
    if (parseInt(quantity.value) > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
}