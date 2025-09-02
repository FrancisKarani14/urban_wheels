import React from 'react'

function Landing_Cars() {

  const cars = [
    {
      image: "/images/bentley.jpg",
      name:"Bentley Bentayga",
      label: "Luxury"
      
    },
    {
      image: "/images/bmw x7.jpg",
      name:"BMW X7",
      label: "Luxury"
      
    },
    {
      image: "/images/pradotx.jpg",
      name:"Landcruiser Prado",
      label: "SUV"
      
    },
    {
      image: "/images/q7.jpg",
      name:"Audi Q7",
      label: "SUV"
      
    },
    {
      image: "/images/range sport.jpg",
      name:"Range Rover Sport",
      label: "Luxury"
      
    },
    {
      image: "/images/sclass.jpg",
      name:"Mercedes benz S-class",
      label: "Luxury"
      
     },
    
  ]
  return (
    <div className='bg-[#F8FAFC]'>
      <div className='grid grid-cols-3 text-center bg-[#cca61e] justify-center gap-20'>
        <section className='flex-col w-75'>
          <h1 className='font-bold '>Well Maintained vehicles</h1>
          <p>All our cars are thoroughly inspected and maintained for smooth and reliable driving</p>
        </section>
        <section className='flex-col w-75'>
          <h1 className='font-bold '>Affordable pricing</h1>
          <p>Enjoy transparent prices with no hidded fees. great cars at great rates its that simple</p>
        </section>
        <section className='flex-col w-75'>
          <h1 className='font-bold '>27/7 support</h1>
          <p>We are here whenever you need us. Fast help, friendly service, and full peace of mind</p>
        </section>


      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
  {cars.map((car, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl 
                 transition-transform duration-300 transform hover:-translate-y-2
                 border border-gray-100"
    >
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover rounded-lg 
                     transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <section className="text-center">
        <h4 className="font-bold text-lg">{car.name}</h4>
        <h4 className="text-gray-500">{car.label}</h4>
      </section>
    </div>
  ))}
</div>

      
    </div>
  )
}

export default Landing_Cars
