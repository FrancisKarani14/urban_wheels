import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-[#18181B] '>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6  text-white p-6 text-center">
  <section>
    <h2 className="font-bold mb-2 text-lg">Urban Wheels</h2>
    <p>
      Urban Wheels delivers reliable, stylish, and affordable car rentals, making every journey smooth and memorable.
    </p>
  </section>

  <section>
    <h2 className="font-bold mb-2 text-lg">Quick Links</h2>
    <Link to="/" className="block hover:text-[#facc25]">Home</Link>
        <Link to="/about" className="block hover:text-[#facc25]">About</Link>
        <Link to="/about" className="block hover:text-[#facc25]">Testimonials</Link>
    <Link to="/book" className="block hover:text-[#facc25]">Book & Contact</Link>
  </section>

  <section>
    <h2 className="font-bold mb-2 text-lg">Contacts</h2>
    <p>urban_wheels@gmail.com</p>
    <p>0720000000</p>
    <p>0700000002</p>
    <p>Urban Plaza, Urban Street, Nairobi</p>
  </section>

  <section>
    <h2 className="font-bold mb-2 text-lg">Social Links</h2>
    <p>Instagram</p>
    <p>TikTok</p>
    <p>X</p>
    <p>Facebook</p>
      </section>
      
      </div>
      <p className='text-[#FFD230] text-center'>Copyright &copy;2025 Created By Francis Karani. All rights reserved</p>
      </div>

  )
}

export default Footer
