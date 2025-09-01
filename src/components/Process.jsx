import React from 'react'

function Process() {
  const rules = [
    {
      name: "age",
      description:"The minimum age should be 21 Years"
    },
     {
      name: "age",
      description:"The minimum age should be 21 Years"
    },
      {
      name: "age",
      description:"The minimum age should be 21 Years"
    },
       {
      name: "age",
      description:"The minimum age should be 21 Years"
    }
  ]
  return (
    <div className='bg-[#F8FAFC]'>

      <div className='bg-[#0A0A0A] flex justify-center gap-10'>
        <img src="https://media.istockphoto.com/id/2199063527/photo/car-seller-shaking-hands-with-buyers-after-successful-deal-selling-auto-in-dealership-center.jpg?s=612x612&w=0&k=20&c=U_sh2RMkDsSwgHBq6s7gtpYEVI8l7n4s4uSP0vSYo20=" alt="process image" className='h-90  ' />
        <section className='flex-col'>
          <h1 className='text-[#FAFAFA] font-bold text-3xl text-center py-5'>Rent your car in 3 easy steps</h1>
          <h2 className='text-[#FAFAFA] font-bold text-2xl'>Choose Your car</h2>
          <p className=' text-base text-[#FAFAFA]'>Explore our fleet of cars and find the vehicle that perfectly suits your preference</p>
          <h2 className='text-[#FAFAFA] font-bold text-2xl'>Book Online</h2>
          <p className=' text-base text-[#FAFAFA]'>Book your car instantly in our customer friendly platform. Select dates and to confirm your reservations</p>
          <h2 className='text-[#FAFAFA] font-bold text-2xl'>Pick & Drive</h2>
          <p className=' text-base text-[#FAFAFA]'>Head to your pickup location and grab your keys. Have a smooth and reliable ride with the well mentained Urban_wheel vehicle</p>

        </section>

      </div>
      <div className="flex bg-[#0A0A0A] py-10 px-5 text-white justify-center">
  <section className="bg-[#171717] flex flex-col md:flex-row gap-10 p-8 rounded-2xl w-full max-w-6xl">
    {/* Left side text */}
    <div className="flex-1">
      <h2 className="text-4xl font-bold mb-3">Rental Terms</h2>
      <p className="text-gray-300 text-lg mb-5">
        We are here for you to help you find the car of your choice
            </p>
            <div className=' flex gap-5'>
              <img src="https://media.istockphoto.com/id/1366350434/photo/shot-of-a-young-woman-using-a-headset-and-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=XrTKzcQDnbGlL8-wh_9APuXJyKJqFGN5KwXb1PlR-co=" alt="Customer care" className='h-10 w-10 rounded-full' />
              <div className="flex-col">
              <h3 className='text-xl font-bold'>Emily Jane</h3>
              <h4 className='text-lg'>Your Personal Rental assistant</h4>
               
              </div>
               
            </div>
            <button className='bg-[#F8FAFC] text-[#0C0A09] py-2 px-4 rounded-2xl cursor-pointer'>Call Us</button>
    </div>

    {/* Right side rules */}
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {rules.map((rule, index) => (
        <div
          key={index}
          className="bg-[#262626] p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">{rule.name}</h3>
          <h4 className="text-gray-400 text-sm">{rule.description}</h4>
        </div>
      ))}
    </div>
  </section>
</div>

      
    </div>
  )
}

export default Process
