import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './EcoThreads.css'

// Mock data for sustainable fashion products
const mockProducts = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "Tops",
    sustainability: "Eco-Friendly",
    rating: 4.8,
    reviews: 124,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    description: "Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear while supporting sustainable fashion.",
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Recycled Denim Jacket",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    category: "Outerwear",
    sustainability: "Recycled",
    rating: 4.9,
    reviews: 89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Black"],
    description: "Crafted from recycled denim, this jacket combines style with environmental responsibility.",
    inStock: true,
    badge: "Eco Choice"
  },
  {
    id: 3,
    name: "Bamboo Fiber Dress",
    price: 65.99,
    originalPrice: 85.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Dresses",
    sustainability: "Bamboo",
    rating: 4.7,
    reviews: 156,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Green", "Beige", "Navy"],
    description: "Soft and breathable bamboo fiber dress that's perfect for both casual and formal occasions.",
    inStock: true,
    badge: "New"
  },
  {
    id: 4,
    name: "Hemp Canvas Tote Bag",
    price: 24.99,
    originalPrice: 32.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    category: "Accessories",
    sustainability: "Hemp",
    rating: 4.6,
    reviews: 203,
    sizes: ["One Size"],
    colors: ["Natural", "Black", "Brown"],
    description: "Durable hemp canvas tote bag - the perfect eco-friendly alternative to plastic bags.",
    inStock: true,
    badge: "Popular"
  },
  {
    id: 5,
    name: "Organic Linen Pants",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Bottoms",
    sustainability: "Organic",
    rating: 4.8,
    reviews: 67,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White", "Black"],
    description: "Comfortable organic linen pants that are both stylish and environmentally conscious.",
    inStock: false,
    badge: "Limited"
  },
  {
    id: 6,
    name: "Recycled Plastic Sunglasses",
    price: 45.99,
    originalPrice: 65.00,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
    category: "Accessories",
    sustainability: "Recycled",
    rating: 4.5,
    reviews: 98,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tortoise"],
    description: "Stylish sunglasses made from recycled ocean plastic, protecting your eyes and the planet.",
    inStock: true,
    badge: "Ocean Friendly"
  }
]

function EcoThreads() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSustainability, setSelectedSustainability] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('featured')
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Load cart and wishlist from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecothreads-cart')
    const savedWishlist = localStorage.getItem('ecothreads-wishlist')
    try {
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) setCart(parsedCart)
      }
    } catch (_) {
      // ignore malformed cart
    }
    try {
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist)
        if (Array.isArray(parsedWishlist)) setWishlist(parsedWishlist)
      }
    } catch (_) {
      // ignore malformed wishlist
    }
  }, [])

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ecothreads-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('ecothreads-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Filter and search products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesSustainability = selectedSustainability === 'All' || product.sustainability === selectedSustainability
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesSustainability && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for 'featured'
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedSustainability, priceRange, sortBy])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id)
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id))
    } else {
      setWishlist([...wishlist, product])
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories']
  const sustainabilityOptions = ['All', 'Eco-Friendly', 'Recycled', 'Organic', 'Bamboo', 'Hemp']

  return (
    <div className="ecothreads">
      {/* Header */}
      <header className="ecothreads-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <i className="fa-solid fa-leaf" style={{color: '#32CD32'}}></i>
              </div>
            <h1 className="logo-text">EcoThreads</h1>
            <span className="tagline">Sustainable Fashion</span>
          </div>
          
          <div className="search-section">
            <div className="search-container">
              <div className="search-icon"><i className="fas fa-search"></i></div>
              <input
                type="text"
                placeholder="Search sustainable fashion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="header-actions">
            <button 
              className="wishlist-btn"
              title="Wishlist"
            >
              <span className="btn-icon"><i className="fas fa-heart"></i></span>
              <span className="btn-text">{wishlist.length}</span>
            </button>
            
            <button 
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
              title="Shopping Cart"
            >
              <span className="btn-icon"><i className="fas fa-shopping-cart"></i></span>
              <span className="btn-text">{getCartItemCount()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Sustainable Fashion for a Better Tomorrow</h2>
          <p className="hero-subtitle">
            Discover eco-friendly clothing that doesn't compromise on style. 
            Every purchase supports environmental responsibility.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Trees Planted</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Eco-Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            <div className="filter-options">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Sustainability</h3>
            <div className="filter-options">
              {sustainabilityOptions.map(option => (
                <button
                  key={option}
                  className={`filter-option ${selectedSustainability === option ? 'active' : ''}`}
                  onClick={() => setSelectedSustainability(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range">
              <span className="price-label">${priceRange[0]} - ${priceRange[1]}</span>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="products-section">
          <div className="products-header">
            <h2 className="products-title">
              {filteredProducts.length} Sustainable Products
            </h2>
            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-badges">
                    {product.badge && (
                      <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                        {product.badge}
                      </span>
                    )}
                    <span className={`sustainability-badge ${product.sustainability.toLowerCase()}`}>
                      {product.sustainability}
                    </span>
                  </div>
                  <div className="product-actions">
                    <button 
                      className="action-btn wishlist-btn"
                      onClick={() => toggleWishlist(product)}
                      title="Add to Wishlist"
                    >
                      {wishlist.find(item => item.id === product.id) ? 
                        <i className="fas fa-heart"></i> : 
                        <i className="far fa-heart"></i>
                      }
                    </button>
                    <button 
                      className="action-btn quick-view-btn"
                      onClick={() => setSelectedProduct(product)}
                      title="Quick View"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <span className="stars"><i className="fas fa-star"></i></span>
                    <span className="rating-value">{product.rating}</span>
                    <span className="reviews-count">({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart ({getCartItemCount()})</h3>
              <button 
                className="close-cart-btn"
                onClick={() => setShowCart(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon"><i className="fas fa-shopping-cart"></i></div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">${item.price}</p>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${getCartTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-modal-btn"
              onClick={() => setSelectedProduct(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <div className="modal-rating">
                  <span className="stars"><i className="fas fa-star"></i></span>
                  <span className="rating-value">{selectedProduct.rating}</span>
                  <span className="reviews-count">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <div className="modal-price">
                  <span className="current-price">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="original-price">${selectedProduct.originalPrice}</span>
                  )}
                </div>
                
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedProduct.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Sustainability:</span>
                    <span className="detail-value">{selectedProduct.sustainability}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Sizes:</span>
                    <span className="detail-value">{selectedProduct.sizes.join(', ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Colors:</span>
                    <span className="detail-value">{selectedProduct.colors.join(', ')}</span>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="modal-wishlist-btn"
                    onClick={() => toggleWishlist(selectedProduct)}
                  >
                    {wishlist.find(item => item.id === selectedProduct.id) ? 
                      <><i className="fas fa-heart"></i> Remove from Wishlist</> : 
                      <><i className="far fa-heart"></i> Add to Wishlist</>
                    }
                  </button>
                  <button 
                    className="modal-cart-btn"
                    onClick={() => {
                      addToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    disabled={!selectedProduct.inStock}
                  >
                    {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div style={{textAlign:'center', padding:'20px'}}>
      <Link to="/" className="video-link" style={{display:'inline-block'}}>
        ← Back to Home
      </Link>
    </div>
  )
}

export default EcoThreads
