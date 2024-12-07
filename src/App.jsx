
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route index path='/' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
