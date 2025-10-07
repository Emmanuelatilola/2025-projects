import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './landingpage'
import Recipe from './components/Recipe'
import EcoThreads from './components/EcoThreads'
import Login from './components/Login'
import Signup from './components/Signup'
import TaskFlow from './components/TaskFlow'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/ecothreads" element={<EcoThreads />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/taskflow" element={<TaskFlow />} />
      
      {/* Add more routes here as needed */}
      </Routes>
    </>
  )
}

export default App
