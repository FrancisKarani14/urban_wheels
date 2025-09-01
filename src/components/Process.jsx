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
      <div className='flex bg-[#0A0A0A]'>

        <section className='bg-[#171717] flex'>
          <div className="flex-col">
          <h2>Rental Terms</h2>
            <p>We are here for you to help you find the car of your choice</p>
            </div>
          <div>
            {rules.map((rule, index) => (
              <div className='bg-[#262626] h-40'>
              <h3>{rule.name}</h3>
                <h4>{ rule.description}</h4>
                </div>
            ))}
          </div>
        </section>


      </div>
      
    </div>
  )
}

export default Process
