// Product Detail Page

let currentProduct = null;
let currentRating = 5;

window.addEventListener('load', function() {
    loadProductDetail();
    loadReviews();
});

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }
    
    // Display product details
    document.getElementById('product-image').src = currentProduct.image || getProductImageUrl(currentProduct.id);
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-price').textContent = '$' + currentProduct.price.toFixed(2);
    document.getElementById('product-description').textContent = currentProduct.description;
    document.getElementById('product-stock').textContent = 'In Stock';
    
    // Display rating
    const reviews = getProductReviews(currentProduct.id);
    const avgRating = reviews.length > 0 ? 
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
    
    document.getElementById('product-rating-stars').innerHTML = getStarsHtml(avgRating);
    document.getElementById('product-rating-count').textContent = reviews.length + ' reviews';
}

function getProductImageUrl(productId) {
    // Use placeholder images from CDN
    const images = [
        'https://via.placeholder.com/400?text=Product+1',
        'https://via.placeholder.com/400?text=Product+2',
        'https://via.placeholder.com/400?text=Product+3',
        'https://via.placeholder.com/400?text=Product+4',
        'https://via.placeholder.com/400?text=Product+5',
        'https://via.placeholder.com/400?text=Product+6',
        'https://via.placeholder.com/400?text=Product+7',
        'https://via.placeholder.com/400?text=Product+8'
    ];
    return images[productId - 1] || images[0];
}

function getStarsHtml(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span style="color: ${i <= rating ? '#ffc107' : '#ddd'}">★</span>`;
    }
    return html;
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

function addProductToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = cart.find(item => item.id === currentProduct.id);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

function setRating(rating) {
    currentRating = rating;
    document.getElementById('review-rating').value = rating;
    
    // Update star display
    document.querySelectorAll('.review-form .star').forEach((star, index) => {
        star.style.color = index < rating ? '#ffc107' : '#ddd';
    });
}

function submitReview(event) {
    event.preventDefault();
    
    const review = {
        productId: currentProduct.id,
        rating: currentRating,
        title: document.getElementById('review-title').value,
        text: document.getElementById('review-text').value,
        author: 'Anonymous',
        date: new Date().toISOString()
    };
    
    // Save review
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    alert('Review submitted successfully!');
    document.getElementById('review-form').reset();
    currentRating = 5;
    loadReviews();
}

function loadReviews() {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const productReviews = allReviews.filter(r => r.productId === currentProduct.id);
    
    let html = '';
    
    productReviews.forEach(review => {
        html += `
            <div class="review-item">
                <div class="review-header">
                    <strong>${review.title}</strong>
                    <span class="review-rating">${getStarsHtml(review.rating)}</span>
                </div>
                <p class="review-author">by ${review.author} on ${new Date(review.date).toLocaleDateString()}</p>
                <p class="review-text">${review.text}</p>
            </div>
        `;
    });
    
    if (productReviews.length === 0) {
        html = '<p>No reviews yet. Be the first to review!</p>';
    }
    
    document.getElementById('reviews-list').innerHTML = html;
}

function getProductReviews(productId) {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return allReviews.filter(r => r.productId === productId);
}