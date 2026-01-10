import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="w-full h-screen 
        bg-[url('https://media.istockphoto.com/id/2232155334/photo/lamborghini-urus-suv-driving-in-monaco.jpg?s=612x612&w=0&k=20&c=rKOqCtV7Z6lLjRUEDG_Rfm8bjM9khmW4RpXtRAEPZH4=')] 
        bg-cover bg-center 
        flex items-center justify-center 
        text-white text-2xl font-bold"
    >
      <div className='flex-col items-center text-center' 
           data-aos="fade-up" 
           data-aos-delay="200"
      >
        <div className='mb-5'>
          <h1 className='text-5xl mb-2'>Explore the Road</h1>
          <h2 className='text-4xl mb-2'>With Urban_Wheels</h2>
        </div>

        <section className='mb-5'>
          <p className='text-base'>From quick weekend rides to big business moments, grand launches to unforgettable dates</p>
          <p className='text-base'>we’re the wheels that move your moments.</p>
        </section>

        <section className='flex gap-3 items-center justify-center'>
          <Link to="/book" className='bg-[#FFDF20] p-2 text-base text-[#09090B] rounded-sm'>
            Reserve your car
          </Link>
          <Link to="/about" className='bg-[#05DF72] p-2 text-base text-[#09090B] rounded-sm'>
            About Urban_Wheels
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Hero
