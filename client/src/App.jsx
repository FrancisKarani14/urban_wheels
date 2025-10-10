import { useState } from 'react'
import Landing from './pages/Landing'
import About from './pages/About'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard/DashboardHome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashSidebar from './pages/Dashboard/DashSidebar'
import DashboardHome from './pages/Dashboard/DashboardHome'
import Cars from './pages/Dashboard/Cars'
import Reservations from './pages/Dashboard/Reservations'
import Users from './pages/Dashboard/Users'

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
        <Route path='/DashSidebar' element={<DashSidebar />} />
        <Route path='/DashboardHome' element={<DashboardHome />} />
        <Route path='/Cars' element={<Cars />} />
        <Route path='/Reservations' element={<Reservations />} />
        <Route path='/Users' element={<Users />} />


      </Routes>
      
    </div>
  )
}

export default App
