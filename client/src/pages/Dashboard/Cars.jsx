import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DashSidebar from './DashSidebar'


export default function Cars() {
  return (
      <div>
          <Navbar />
          <DashSidebar />
          <h1>Cars Management</h1>
            <Footer/>
      
    </div>
  )
}
