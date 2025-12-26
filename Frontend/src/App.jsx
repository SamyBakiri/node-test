import backgroundImage from './assets/image.png'
import './App.css'

function App() {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rectangle"></div>
    </div>
  )
}

export default App
