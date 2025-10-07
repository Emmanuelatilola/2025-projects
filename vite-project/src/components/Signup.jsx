import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Get existing users
    const users = JSON.parse(localStorage.getItem('taskflow-users') || '[]')
    
    // Check if user already exists
    if (users.find(u => u.email === formData.email)) {
      setError('User already exists')
      setIsLoading(false)
      return
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    }

    // Save user
    users.push(newUser)
    localStorage.setItem('taskflow-users', JSON.stringify(users))
    localStorage.setItem('taskflow-current-user', JSON.stringify(newUser))
    
    navigate('/taskflow')
    setIsLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        padding: '3rem',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <i className="fas fa-tasks" style={{ fontSize: '2rem', color: '#4a5568' }}></i>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#4a5568', margin: 0 }}>TaskFlow</h1>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#4a5568', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: '#4a5568', fontSize: '1rem', margin: 0, opacity: 0.8 }}>Join TaskFlow today</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div style={{
              background: '#4a5568',
              color: '#ffffff',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: '500',
              border: '2px solid #4a5568'
            }}>
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.95rem' }}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={{
                padding: '1rem',
                border: '2px solid #4a5568',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: '#ffffff',
                color: '#4a5568'
              }}
              onFocus={(e) => {
                e.target.style.outline = 'none'
                e.target.style.borderColor = '#4a5568'
                e.target.style.background = '#ffffff'
                e.target.style.boxShadow = '0 0 0 3px rgba(38, 42, 53, 0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.95rem' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                padding: '1rem',
                border: '2px solid #4a5568',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: '#ffffff',
                color: '#4a5568'
              }}
              onFocus={(e) => {
                e.target.style.outline = 'none'
                e.target.style.borderColor = '#4a5568'
                e.target.style.background = '#ffffff'
                e.target.style.boxShadow = '0 0 0 3px rgba(38, 42, 53, 0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.95rem' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength="6"
              style={{
                padding: '1rem',
                border: '2px solid #4a5568',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: '#ffffff',
                color: '#4a5568'
              }}
              onFocus={(e) => {
                e.target.style.outline = 'none'
                e.target.style.borderColor = '#4a5568'
                e.target.style.background = '#ffffff'
                e.target.style.boxShadow = '0 0 0 3px rgba(38, 42, 53, 0.1)'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#4a5568',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(38, 42, 53, 0.3)',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(38, 42, 53, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(38, 42, 53, 0.3)'
              }
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #4a5568' }}>
          <p style={{ color: '#4a5568', margin: 0, opacity: 0.8 }}>
            Already have an account? <Link to="/login" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '600', transition: 'color 0.3s ease' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
