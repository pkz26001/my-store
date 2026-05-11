// Order Tracking and Management

// Load orders on page load
window.addEventListener('load', function() {
    displayOrders();
});

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const container = document.getElementById('orders-container');
    
    if (orders.length === 0) {
        document.getElementById('no-orders-message').style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="orders-list">';
    
    orders.forEach(order => {
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h3>Order ${order.id}</h3>
                        <p class="order-date">${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div class="order-total">
                        <span class="price">$${(order.total / 100).toFixed(2)}</span>
                        <span class="status ${order.status}">${order.status.toUpperCase()}</span>
                    </div>
                </div>
                <div class="order-items">
                    <p><strong>Items:</strong> ${order.items.length}</p>
                </div>
                <div class="order-actions">
                    <button class="btn btn-secondary" onclick="viewOrderDetails('${order.id}')">View Details</button>
                    <button class="btn btn-secondary" onclick="trackOrder('${order.id}')">Track Order</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    let itemsHtml = '';
    order.items.forEach(item => {
        itemsHtml += `
            <div class="modal-item">
                <span>${item.name}</span>
                <span>Qty: ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    document.getElementById('modal-order-details').innerHTML = `
        <div class="modal-customer">
            <h4>Customer Information</h4>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>City:</strong> ${order.customer.city}, ${order.customer.state} ${order.customer.zip}</p>
        </div>
        <div class="modal-items">
            <h4>Order Items</h4>
            ${itemsHtml}
            <div class="modal-total">
                <strong>Total:</strong> $${(order.total / 100).toFixed(2)}
            </div>
        </div>
    `;
    
    showOrderTracking(orderId);
    document.getElementById('order-modal').style.display = 'block';
}

function trackOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    let trackingHtml = `
        <div class="tracking-info">
            <p><strong>Tracking Number:</strong> ${order.tracking.number}</p>
            <p><strong>Estimated Delivery:</strong> ${order.tracking.estimatedDelivery}</p>
            <div class="tracking-timeline">
    `;
    
    order.tracking.events.forEach(event => {
        trackingHtml += `
            <div class="timeline-event">
                <div class="timeline-date">${new Date(event.date).toLocaleDateString()}</div>
                <div class="timeline-status">${event.status}</div>
                <div class="timeline-description">${event.description}</div>
            </div>
        `;
    });
    
    trackingHtml += '</div></div>';
    
    document.getElementById('modal-order-details').innerHTML = trackingHtml;
    document.getElementById('modal-tracking-info').innerHTML = `
        <p><strong>Current Status:</strong> ${order.tracking.status}</p>
        <p><strong>Tracking Number:</strong> ${order.tracking.number}</p>
    `;
    
    document.getElementById('order-modal').style.display = 'block';
}

function showOrderTracking(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    let trackingHtml = `
        <p><strong>Tracking Number:</strong> ${order.tracking.number}</p>
        <p><strong>Status:</strong> ${order.tracking.status}</p>
        <p><strong>Estimated Delivery:</strong> ${order.tracking.estimatedDelivery}</p>
    `;
    
    document.getElementById('modal-tracking-info').innerHTML = trackingHtml;
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}