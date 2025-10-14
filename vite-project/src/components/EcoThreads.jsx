import React, { useState, useEffect } from 'react'
import './EcoThreads.css'

const seedProducts = [
  { id: 1, name: 'Organic Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', category: 'Tops', badge: 'New' },
  { id: 2, name: 'Recycled Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', category: 'Outerwear', badge: 'Popular' },
  { id: 3, name: 'Bamboo Dress', price: 65.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', category: 'Dresses', badge: 'Eco' },
  { id: 4, name: 'Hemp Tote', price: 24.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', category: 'Accessories', badge: 'Best' },
  { id: 5, name: 'Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', category: 'Tops', badge: 'Fresh' },
  { id: 6, name: 'Cork Wallet', price: 19.99, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=500&fit=crop', category: 'Accessories', badge: 'Vegan' },
  { id: 7, name: 'Organic Joggers', price: 54.99, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', category: 'Bottoms', badge: 'Cozy' },
  { id: 8, name: 'Recycled Sneakers', price: 79.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', category: 'Footwear', badge: 'Eco' },
  { id: 9, name: 'Organic Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=500&fit=crop', category: 'Outerwear', badge: 'Warm' },
  { id: 10, name: 'Bamboo Socks (3-pack)', price: 14.99, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop', category: 'Accessories', badge: 'Soft' },
  { id: 11, name: 'Tencel Scarf', price: 22.99, image: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?w=400&h=500&fit=crop', category: 'Accessories', badge: 'Light' },
  { id: 12, name: 'Recycled Backpack', price: 69.99, image: 'https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=400&h=500&fit=crop', category: 'Bags', badge: 'Recycled' }
]

function EcoThreads() {
  const [items, setItems] = useState(seedProducts)
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('efx-cart')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setCart(parsed)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('efx-cart', JSON.stringify(cart))
  }, [cart])

  const filtered = items.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  const addToCart = (product) => {
    const existing = cart.find(c => c.id === product.id)
    if (existing) {
      setCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const updateQty = (id, next) => {
    if (next <= 0) {
      setCart(cart.filter(c => c.id !== id))
    } else {
      setCart(cart.map(c => c.id === id ? { ...c, qty: next } : c))
    }
  }

  const count = cart.reduce((n, c) => n + c.qty, 0)
  const total = cart.reduce((n, c) => n + c.qty * c.price, 0)

  return (
    <div className="efx-root">
      <header className="efx-header">
        <div className="efx-header-wrap">
          <div className="efx-brand">
            <span className="efx-brand-icon">🌿</span>
            <h1 className="efx-brand-text">EcoThreads</h1>
          </div>
          <div className="efx-search">
            <input className="efx-search-input" placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="efx-actions">
            <button className="efx-cart-btn" onClick={() => setCartOpen(true)}>
              <span className="efx-cart-count">{count}</span>
              Cart
            </button>
          </div>
        </div>
      </header>

      <section className="efx-hero">
        <div className="efx-hero-inner">
          <h2 className="efx-hero-title">Sustainable styles, responsibly made</h2>
          <p className="efx-hero-sub">Discover eco‑friendly pieces that look good and do good.</p>
        </div>
      </section>

      <main className="efx-main">
        <div className="efx-grid">
          {filtered.map(p => (
            <article key={p.id} className="efx-card">
              <div className="efx-card-media">
                <img src={p.image} alt={p.name} />
                {p.badge && <span className="efx-badge">{p.badge}</span>}
              </div>
              <div className="efx-card-body">
                <h3 className="efx-card-title">{p.name}</h3>
                <div className="efx-card-row">
                  <span className="efx-price">${p.price}</span>
                  <button className="efx-add" onClick={() => addToCart(p)}>Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {cartOpen && (
        <div className="efx-drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside className="efx-drawer" onClick={e => e.stopPropagation()}>
            <div className="efx-drawer-head">
              <h4>Cart ({count})</h4>
              <button className="efx-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="efx-drawer-body">
              {cart.length === 0 ? (
                <div className="efx-empty">Your cart is empty</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="efx-line">
                    <img src={item.image} alt={item.name} />
                    <div className="efx-line-info">
                      <div className="efx-line-name">{item.name}</div>
                      <div className="efx-line-ctrls">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="efx-line-price">${(item.qty * item.price).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="efx-drawer-foot">
              <div className="efx-total">Total: <strong>${total.toFixed(2)}</strong></div>
              <button className="efx-checkout" disabled={cart.length === 0}>Checkout</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default EcoThreads
