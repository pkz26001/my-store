# My Store - E-Commerce Website

A complete, modern e-commerce platform with advanced features including user authentication, payment processing, product reviews, and order tracking.

## 🚀 Features

### Core Features
- ✅ **Product Catalog** - Browse and search products
- ✅ **Shopping Cart** - Add/remove items with persistent storage
- ✅ **User Authentication** - Secure login and signup system
- ✅ **Payment Processing** - Stripe and PayPal integration
- ✅ **Order Management** - Complete order tracking system
- ✅ **Customer Reviews** - Rate and review products
- ✅ **CDN Images** - High-quality product images from CDN
- ✅ **Responsive Design** - Mobile-friendly interface

### Pages Included
1. **index.html** - Home page with featured products
2. **products.html** - Full product catalog with filters
3. **cart.html** - Shopping cart management
4. **auth.html** - User login and signup
5. **product-detail.html** - Individual product page with reviews
6. **checkout.html** - Payment and order confirmation
7. **orders.html** - Order history and tracking

## 📋 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/my-store.git
cd my-store
```

2. **Start a local server:**
```bash
python -m http.server 8000
# or
npx http-server
```

3. **Open in browser:**
```
http://localhost:8000
```

## 🛍️ How to Use

### Shopping
1. Browse products on the Products page
2. Click on any product to view details
3. Read customer reviews
4. Add items to your cart
5. Proceed to checkout

### User Accounts
1. Click "Account" in the navigation
2. Sign up for a new account or login
3. Your account information is stored locally

### Payment Methods

#### Stripe
1. Enter your card details at checkout
2. Payment is processed securely through Stripe
3. Test card: 4242 4242 4242 4242

#### PayPal
1. Select PayPal at checkout
2. Complete payment through PayPal

**Note:** To enable real payments, add your API keys in `js/checkout.js`

### Product Reviews
1. View product details
2. Scroll to the reviews section
3. Submit your rating and review
4. Reviews are displayed with other customer reviews

### Order Tracking
1. Go to "My Orders" after placing an order
2. View order details and tracking information
3. Track shipping status in real-time

## 🔧 Configuration

### Stripe Integration

1. Get your API key from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `js/checkout.js`:
```javascript
stripe = Stripe('pk_test_YOUR_STRIPE_KEY');
```

### PayPal Integration

1. Get your Client ID from [PayPal Developer](https://developer.paypal.com)
2. Update the script tag in `checkout.html`:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID"></script>
```

### Product Images

This site uses placeholder images from `https://via.placeholder.com/`. To use custom images:

1. Update product image URLs in `js/products.js`
2. Or modify the `getProductImageUrl()` function in `js/product-detail.js`
3. Use any CDN service (Cloudinary, Imgix, AWS S3, etc.)

## 📁 File Structure

```
my-store/
├── index.html              # Home page
├── products.html           # Product catalog
├── cart.html              # Shopping cart
├── auth.html              # Login/signup
├── product-detail.html    # Product details & reviews
├── checkout.html          # Payment checkout
├── orders.html            # Order management
├── css/
│   ├── style.css          # Main stylesheet
│   ├── responsive.css     # Mobile styles
│   ├── auth.css           # Auth page styles
│   ├── product-detail.css # Product page styles
│   └── orders.css         # Orders page styles
├── js/
│   ├── products.js        # Product data
│   ├── cart.js            # Cart functionality
│   ├── auth.js            # Authentication
│   ├── checkout.js        # Payment processing
│   ├── product-detail.js  # Product reviews
│   ├── orders.js          # Order tracking
│   └── main.js            # Main functionality
├── README.md              # Documentation
├── LICENSE                # MIT License
└── .gitignore             # Git ignore rules
```

## 💾 Data Storage

All data is stored locally using **localStorage**:
- User accounts: `users`
- Shopping cart: `cart`
- Orders: `orders`
- Product reviews: `reviews`
- Current user: `currentUser`

**Note:** This is for demo purposes. Production sites should use a backend database.

## 🔐 Security Notes

- Passwords are stored in localStorage (not recommended for production)
- Use HTTPS for real payment processing
- Implement proper backend authentication
- Never commit API keys to version control
- Use environment variables for sensitive data

## 🎨 Customization

### Change Store Name
Search for "My Store" in all HTML files and replace with your store name.

### Change Colors
Edit `css/style.css` and modify color variables:
```css
/* Primary color */
#667eea

/* Secondary color */
#764ba2
```

### Add More Products
Edit `js/products.js` and add items to the products array:
```javascript
{
    id: 9,
    name: "New Product",
    price: 49.99,
    category: "electronics",
    description: "Product description"
}
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Site will be live at `https://yourusername.github.io/my-store/`

### Netlify
1. Connect your GitHub repo
2. Deploy automatically
3. Custom domain support available

### Vercel
1. Import your GitHub repo
2. Deploy with one click
3. Automatic SSL and CDN

## 📊 Next Steps (Optional Enhancements)

- [ ] Backend API integration
- [ ] Database (MongoDB, Firebase, PostgreSQL)
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Wishlist feature
- [ ] Product recommendations
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact: support@mystore.com

---

**Happy Selling! 🎉**

Built with ❤️ by Your Name
