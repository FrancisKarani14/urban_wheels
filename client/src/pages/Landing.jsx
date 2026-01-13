import React from 'react'
import Hero from '../components/Hero'
import Landing_Cars from '../components/Landing_Cars'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Landing() {
  return (
    <div className='  mx-5 '>
      < Navbar />
      <Hero />
      <Landing_Cars />
      <Process />
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}

export default Landing
