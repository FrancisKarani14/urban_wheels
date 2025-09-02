import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Solutions() {
  const solutions = [
    {
      name: "Hire with Driver",
      statement: "Ride stress-free with a professional driver"
    },
    {
      name: "Business Car Rental",
      statement: "Reliable cars tailored for business needs"
    },
    {
      name: "Chauffeur Service",
      statement: "Travel in comfort with a personal driver"
    },
    {
      name: "One-Way Rentals",
      statement: "Pick up here, drop off anywhere"
    },
    {
      name: "Long-Term Rentals",
      statement: "Flexible rentals for weeks or months"
    },
    {
      name: "Luxury Car Rental",
      statement: "Experience the thrill of driving premium cars in unmatched style, comfort, and class"
    },
    {
      name: "Events",
      statement: "Stylish cars to make your event unforgettable"
    },
    {
      name: "Corporate Solutions",
      statement: "Customized fleet solutions for companies"
    }
  ]

  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);


  return (
    <div className="bg-[#F5F5F4] py-12 px-6">
      <h2 className="text-3xl font-extrabold text-center text-[#31C950] mb-10">
        Flexible Rental Solutions for Every Need
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
             data-aos="fade-up"     // <-- Add this
           data-aos-delay={index * 100} 
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {solution.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {solution.statement}
            </p>
            <Link to="/book"className='bg-[#05DF72] py-1 px-2 rounded-sm'>Book</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Solutions
