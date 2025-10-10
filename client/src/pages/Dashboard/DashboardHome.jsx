import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DashSidebar from './DashSidebar'

export default function DashboardHome() {
  return (
      <div>
          <Navbar />
          <DashSidebar />
          <h1>Admin Dashboard</h1>

          <Footer/>
      
    </div>
  )
}
