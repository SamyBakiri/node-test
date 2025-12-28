import { useState } from 'react'
import './App.css'

function Login({ onNavigateToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        alert('Login successful!')
        // For now, just show success. We'll add navigation later
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className='overlay'></div>
      <div className="rectangle">
        <div className="form-container">
          <h1 className="form-title">Welcome Back!</h1>
          
          {error && (
            <div style={{
              padding: '10px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Password</label>
                <span className="forgot-password-link">Forgot password</span>
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="remember-me"
                className="remember-checkbox"
              />
              <label htmlFor="remember-me" className="remember-label">
                Remember for 30 days
              </label>
            </div>
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="sign-in-text">
            Don't have an account? <span className="sign-in-link" onClick={onNavigateToSignUp}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login