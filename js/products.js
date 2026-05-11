// Product Database
const products = [
    {
        id: 1,
        name: "Luxury Chocolate Gift Box",
        price: 49.99,
        originalPrice: 79.99,
        category: "chocolates",
        rating: 4.8,
        reviews: 342,
        description: "Premium assorted chocolates in elegant packaging",
        image: "https://via.placeholder.com/400x300?text=Chocolate+Box",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Fresh Flower Bouquet",
        price: 59.99,
        originalPrice: 89.99,
        category: "flowers",
        rating: 4.9,
        reviews: 521,
        description: "Beautiful arrangement of fresh seasonal flowers",
        image: "https://via.placeholder.com/400x300?text=Flower+Bouquet",
        badge: "Hot Deal"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 129.99,
        originalPrice: 199.99,
        category: "electronics",
        rating: 4.6,
        reviews: 289,
        description: "Premium wireless headphones with noise cancellation",
        image: "https://via.placeholder.com/400x300?text=Headphones",
        badge: "Sale"
    },
    {
        id: 4,
        name: "Bestseller Novel Collection",
        price: 34.99,
        originalPrice: 49.99,
        category: "books",
        rating: 4.7,
        reviews: 156,
        description: "Set of 3 award-winning bestseller novels",
        image: "https://via.placeholder.com/400x300?text=Books+Collection",
        badge: ""
    },
    {
        id: 5,
        name: "Luxury Gift Hamper",
        price: 89.99,
        originalPrice: 129.99,
        category: "gifts",
        rating: 4.8,
        reviews: 412,
        description: "Premium assortment of gourmet items and treats",
        image: "https://via.placeholder.com/400x300?text=Gift+Hamper",
        badge: "Trending"
    },
    {
        id: 6,
        name: "Premium Scented Candles",
        price: 44.99,
        originalPrice: 69.99,
        category: "gifts",
        rating: 4.9,
        reviews: 678,
        description: "Set of 5 luxurious aromatic candles",
        image: "https://via.placeholder.com/400x300?text=Candles",
        badge: "Best Seller"
    },
    {
        id: 7,
        name: "Smart Watch Elite",
        price: 199.99,
        originalPrice: 299.99,
        category: "electronics",
        rating: 4.5,
        reviews: 234,
        description: "Advanced fitness tracking smart watch",
        image: "https://via.placeholder.com/400x300?text=Smart+Watch",
        badge: "Sale"
    },
    {
        id: 8,
        name: "Personalized Photo Frame",
        price: 39.99,
        originalPrice: 59.99,
        category: "gifts",
        rating: 4.8,
        reviews: 198,
        description: "Custom engraved wooden photo frame",
        image: "https://via.placeholder.com/400x300?text=Photo+Frame",
        badge: "New"
    }
];

// Helper Functions
function getStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < Math.round(rating) ? "⭐" : "☆";
    }
    return stars;
}

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

function getDiscountPercentage(original, current) {
    return Math.round(((original - current) / original) * 100);
}

function searchProducts(query) {
    return products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
}

function filterByCategory(category) {
    if (!category) return products;
    return products.filter(p => p.category === category);
}

function sortProducts(productsArray, sortType) {
    let sorted = [...productsArray];
    
    switch(sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.reverse();
        default:
            return sorted.sort((a, b) => b.reviews - a.reviews);
    }
}