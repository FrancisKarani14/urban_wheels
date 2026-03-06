import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About_us from '../components/About_us'
import Statistics from '../components/Statistics'
import Testimonials from '../components/Testimonials'
import Solutions from '../components/Solutions'
import CTABanner from '../components/CTABanner'
import FAQ from '../components/Faq'
function About() {
  return (
    <div>
      <div className='mx-5'>
        <Navbar />
      </div>
      <div className='min-h-screen flex items-center justify-center'>
        <About_us />
      </div>
      <div className='min-h-screen flex items-center justify-center'>
        <Statistics />
      </div>
      <div className='min-h-screen flex items-center justify-center'>
        <Testimonials />
      </div>
      <div className='min-h-screen flex items-center justify-center'>
        <Solutions />
      </div>
      <div className='min-h-screen flex items-center justify-center'>
        <CTABanner />
      </div>
      <div className='min-h-screen flex flex-col justify-between'>
        <FAQ />
        <Footer />
      </div>
    </div>
  )
}

export default About
