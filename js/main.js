// Update cart count on page load
window.addEventListener('load', function() {
    updateCartCount();
    loadFeaturedProducts();
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Load featured products on home page
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const discount = getDiscountPercentage(product.originalPrice, product.price);
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badge}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${getStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    <span class="discount">-${discount}%</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-outline" onclick="viewProduct(${product.id})">View</button>
                </div>
            </div>
        </div>
    `;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Load products on products page
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    renderProducts(products);
}

// Render products
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
        emptyState.style.display = 'none';
    }
}

// Search products
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        applyFilters();
    });
}

// Setup filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

// Apply all filters
function applyFilters() {
    const searchQuery = document.getElementById('search-input')?.value || '';
    const category = document.getElementById('category-filter')?.value || '';
    const sortType = document.getElementById('sort-filter')?.value || 'popularity';
    
    let filtered = searchQuery ? searchProducts(searchQuery) : products;
    filtered = filterByCategory(category || '', filtered);
    filtered = sortProducts(filtered, sortType);
    
    renderProducts(filtered);
}

// Initialize page
window.addEventListener('load', function() {
    loadProducts();
    setupSearch();
    setupFilters();
});