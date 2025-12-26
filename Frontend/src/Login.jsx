import backgroundImage from './assets/image.png'
import './App.css'

function Login({ onNavigateToSignUp }) {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rectangle">
        <div className="form-container">
          <h1 className="form-title">Welcome Back!</h1>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
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

          <button className="login-button">Login</button>

          <p className="sign-in-text">
            Don't have an account? <span className="sign-in-link" onClick={onNavigateToSignUp}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

