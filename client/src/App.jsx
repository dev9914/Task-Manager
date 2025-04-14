import { useState } from 'react'
import './App.css'
import { Routes , Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes'

function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Signin/>}/>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
        }/>
    </Routes>
  )
}

export default App
