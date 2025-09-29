import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'
import Loader from './ui/Loader'

function Login() {
  const [formData, setFormData] = useState({
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

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('taskflow-users') || '[]')
    const foundUser = users.find(u => u.email === formData.email && u.password === formData.password)
    
    if (foundUser) {
      // Save current user
      localStorage.setItem('taskflow-current-user', JSON.stringify(foundUser))
      navigate('/taskflow')
    } else {
      setError('Invalid email or password')
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-tasks"></i>
            <h1>TaskFlow</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <Loader text="Signing In..." /> : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p style={{marginTop:'8px'}}>
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
