import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import AcademicHistory from './pages/AcademicHistory'
import HealthInfo from './pages/HealthInfo'
import DocumentsUpload from './pages/DocumentsUpload'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/academic" element={<AcademicHistory />} />
          <Route path="/academic" element={<AcademicHistory />} />
          <Route path="/health" element={<HealthInfo />} />
          <Route path="/documents" element={<DocumentsUpload />} />
        </Routes>
    </Router>
  )
}

export default App