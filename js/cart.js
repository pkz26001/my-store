// Shopping Cart Functions

window.addEventListener('load', function() {
    displayCart();
    updateCartSummary();
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('cart-items-container');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '';
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    let html = '';
    cart.forEach((item, index) => {
        const total = (item.price * item.quantity).toFixed(2);
        html += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" 
                        onchange="updateQuantity(${index}, this.value)" min="1">
                </td>
                <td>$${total}</td>
                <td>
                    <button class="btn btn-secondary" onclick="removeFromCart(${index})">Remove</button>
                </td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart[index].quantity = parseInt(quantity) || 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartSummary();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartSummary();
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shipping = 10;
    const tax = (subtotal * 0.1).toFixed(2);
    const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax;
    document.getElementById('total').textContent = '$' + total;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}