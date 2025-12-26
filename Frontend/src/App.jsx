import { useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'

function App() {
  const [currentPage, setCurrentPage] = useState('signup') // Default to signup page

  const handleNavigateToLogin = () => {
    setCurrentPage('login')
  }

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup')
  }

  return (
    <>
      {currentPage === 'signup' ? (
        <SignUp onNavigateToLogin={handleNavigateToLogin} />
      ) : (
        <Login onNavigateToSignUp={handleNavigateToSignUp} />
      )}
    </>
  )
}

export default App
