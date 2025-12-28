import { useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'
import EmailScheduler from './EmailScheduler'

function App() {
  const [currentPage, setCurrentPage] = useState('signup') // Default to signup page

  const handleNavigateToLogin = () => {
    setCurrentPage('login')
  }

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup')
  }

  const handleNavigateToEmailScheduler = () => {
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
        <EmailScheduler />
      )}
    </>
  )
}

export default App