import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About_us from '../components/About_us'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
function About() {
  return (
    <div className='mx-5'>
      <Navbar />
      <About_us />
      <Solutions />
      <Testimonials />
      <Footer />
      
    </div>
  )
}

export default About
