// Stripe and PayPal Payment Processing

let stripe, elements, cardElement;

// Initialize Stripe
function initStripe() {
    stripe = Stripe('pk_test_YOUR_STRIPE_KEY'); // Replace with your Stripe key
    elements = stripe.elements();
    cardElement = elements.create('card');
    cardElement.mount('#card-element');
    
    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

// Initialize PayPal
function initPayPal() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            const total = getCartTotal();
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: (total / 100).toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                processOrder(orderData);
            });
        },
        onError: function(err) {
            alert('Payment error: ' + err);
        }
    }).render('#paypal-container');
}

// Toggle payment method
document.querySelectorAll('input[name="payment-method"]')?.forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('stripe-container').style.display = 
            this.value === 'stripe' ? 'block' : 'none';
        document.getElementById('paypal-container').style.display = 
            this.value === 'paypal' ? 'block' : 'none';
    });
});

// Checkout Form Submission
document.getElementById('checkout-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (paymentMethod === 'stripe') {
        processStripePayment();
    }
});

// Process Stripe Payment
async function processStripePayment() {
    const { token, error } = await stripe.createToken(cardElement);
    
    if (error) {
        document.getElementById('card-errors').textContent = error.message;
        return;
    }
    
    // Send token to backend (simulated)
    const orderData = {
        customer: {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            address: document.getElementById('customer-address').value,
            city: document.getElementById('customer-city').value,
            state: document.getElementById('customer-state').value,
            zip: document.getElementById('customer-zip').value,
            country: document.getElementById('customer-country').value
        },
        payment: {
            method: 'stripe',
            token: token.id
        },
        cart: getCart(),
        total: getCartTotal()
    };
    
    processOrder(orderData);
}

// Process Order
function processOrder(orderData) {
    // Create order record
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderId = 'ORD-' + Date.now();
    
    const order = {
        id: orderId,
        date: new Date().toISOString(),
        customer: orderData.customer,
        items: getCart(),
        total: getCartTotal(),
        status: 'pending',
        tracking: {
            number: 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            status: 'Order Placed',
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            events: [
                {
                    date: new Date().toISOString(),
                    status: 'Order Placed',
                    description: 'Your order has been placed'
                }
            ]
        }
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    alert('Order placed successfully! Order ID: ' + orderId);
    window.location.href = 'orders.html';
}

// Get cart total
function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    // Add shipping and tax
    const shipping = 10 * 100; // $10 in cents
    const tax = Math.round(total * 0.1); // 10% tax
    return total + shipping + tax;
}

// Load order summary on page load
window.addEventListener('load', function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let subtotal = 0;
    let html = '';
    
    cart.forEach(item => {
        html += `<div class="summary-item"><span>${item.name}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`;
        subtotal += item.price * item.quantity;
    });
    
    document.getElementById('order-items').innerHTML = html;
    
    const shipping = 10;
    const tax = (subtotal * 0.1).toFixed(2);
    const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);
    
    document.getElementById('summary-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summary-shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('summary-tax').textContent = '$' + tax;
    document.getElementById('summary-total').textContent = '$' + total;
    
    // Initialize payment systems
    initStripe();
    initPayPal();
});