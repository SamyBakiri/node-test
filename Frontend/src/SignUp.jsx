import backgroundImage from './assets/image.png'
import './App.css'

function SignUp({ onNavigateToLogin }) {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rectangle">
        <div className="form-container">
          <h1 className="form-title">Get Started Now</h1>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button className="login-button">Sign Up</button>

          <p className="sign-in-text">
            Have an account? <span className="sign-in-link" onClick={onNavigateToLogin}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

