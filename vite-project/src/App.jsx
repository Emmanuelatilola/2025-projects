import { Routes, Route } from 'react-router-dom'
import LandingPage from './landingpage'
import Recipe from './components/Recipe'
import EcoThreads from './components/EcoThreads'
import Login from './components/Login'
import Signup from './components/Signup'
import TaskFlow from './components/TaskFlow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/ecothreads" element={<EcoThreads />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/taskflow" element={<TaskFlow />} />
      
      {/* Add more routes here as needed */}
    </Routes>
  )
}

export default App
