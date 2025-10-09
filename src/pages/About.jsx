import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About_us from '../components/About_us'
import Solutions from '../components/Solutions'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/Faq'
function About() {
  return (
    <div className='mx-5 py-16'>
      <Navbar />
      <About_us />
      <Solutions />
      <Testimonials />
      <FAQ />
      <Footer />
      
    </div>
  )
}

export default About
