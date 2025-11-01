import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Personal_Info from './pages/personal'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personal" element={<Personal_Info/>} />
        </Routes>
    </Router>
  )
}

export default App