import { useState, useEffect } from 'react'
import SignUp from './SignUp'
import Login from './Login'
import EmailScheduler from './EmailScheduler'

function App() {
  const [currentPage, setCurrentPage] = useState('signup') // Default to signup page

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn')
    if (userLoggedIn === 'true') {
      setCurrentPage('emailscheduler')
    }
  }, [])


  const handleNavigateToLogin = () => {
    localStorage.setItem('isLoggedIn', 'false')
    setCurrentPage('login')
  }

  const handleNavigateToSignUp = () => {
    localStorage.setItem('isLoggedIn', 'false')
    setCurrentPage('signup')
  }

  const handleNavigateToEmailScheduler = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setCurrentPage('emailscheduler')
  }

  return (
    <>
      {currentPage === 'signup' && (
        <SignUp onNavigateToLogin={handleNavigateToLogin} />
      )}
      {currentPage === 'login' && (
        <Login 
          onNavigateToSignUp={handleNavigateToSignUp}
          onNavigateToEmailScheduler={handleNavigateToEmailScheduler}
        />
      )}
      {currentPage === 'emailscheduler' && (
        <EmailScheduler 
          onNavigateToSignUp={handleNavigateToSignUp}
        />
      )}
    </>
  )
}

export default App