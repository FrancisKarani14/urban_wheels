import { useState } from 'react'
import Landing from './pages/Landing'
import About from './pages/About'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'


import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <div className='bg-[#292524]'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/About' element={<About />} />
        <Route path='/Book' element={<Book />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />


      </Routes>
      
    </div>
  )
}

export default App
