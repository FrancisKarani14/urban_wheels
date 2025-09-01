import { useState } from 'react'
import Landing from './pages/Landing'
import About from './pages/About'
import Book from './pages/Book'

import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/About' element={<About />} />
        <Route path='/Book' element={<Book />} />


      </Routes>
      
    </div>
  )
}

export default App
