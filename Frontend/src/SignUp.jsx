import { useState } from 'react'
import backgroundImage from './assets/image.png'
import './App.css'

function SignUp({ onNavigateToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    //console.log('Signing up with:', { name, email, password })
    console.log(JSON.stringify({ name, email, password }))
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      console.log('Response:', response)

      const data = await response.json()

      if (response.ok) {
        // Registration successful, navigate to login
        alert('Registration successful! Please login.')
        onNavigateToLogin()
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className='overlay'></div>
      <div className="rectangle">
        <div className="form-container">
          <h1 className="form-title">Get Started Now</h1>
          
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

          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            
            <p className="sign-in-text">
              Have an account? <span className="sign-in-link" onClick={onNavigateToLogin}>Login In</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default SignUp