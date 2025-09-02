import React from 'react'
import { Link } from 'react-router-dom';

function List() {
  const cars = [
    {
      fleet: "10",
      image: "https://media.istockphoto.com/id/2189963451/photo/toyota-alphard.jpg?s=612x612&w=0&k=20&c=CwqcFqCYl-yZjpajEY9kjG8_N0iZhqkHc05Hy_hsKoI=",
      name: "Toyota Alphard",
      shape: "Luxury Van / MPV",
      capacity: "7 passengers",
      cost: "$180/day"
    },
    {
      fleet: "15",
      image: "https://media.istockphoto.com/id/2189809156/photo/toyota-alphard.jpg?s=612x612&w=0&k=20&c=alaRRwT0JU_1GgxdfxHfsMo4T2oSYyyMfeyBuBm4CkQ=",
      name: "Toyota Vellfire",
      shape: "Luxury Van / MPV",
      capacity: "7 passengers",
      cost: "$190/day"
    },
    {
      fleet: "20",
      image: "https://media.istockphoto.com/id/2196814474/photo/mercedes-benz-gle-350-4matic-suv-at-a-dealership-mercedes-offers-the-gle350-with-a-2-0l-turbo.jpg?s=612x612&w=0&k=20&c=AaIWJt-2iPRDRQX0658OKtASsxnhaPjzYC_Ihx6r9_s=",
      name: "Mercedes Benz GLE",
      shape: "Luxury SUV",
      capacity: "5 passengers",
      cost: "$250/day"
    },
    {
      fleet: "20",
      image: "https://media.istockphoto.com/id/2180257352/photo/range-rover.jpg?s=612x612&w=0&k=20&c=nNoGUlQbkB1VOcyxkdZi4xgRz8C2LwFbjjLsgGcbHio=",
      name: "Range Rover Sport",
      shape: "Luxury SUV",
      capacity: "5 passengers",
      cost: "$280/day"
    },
    {
      fleet: "6",
      image: "https://media.istockphoto.com/id/508008258/photo/mercedes-benz-s-class-s65-amg-coupe.jpg?s=612x612&w=0&k=20&c=9aHW30cuAkZat7CJ3c1h2a4s2Km_im97BkwyOn47I8w=",
      name: "Mercedes Benz S-Class",
      shape: "Luxury Sedan",
      capacity: "4 passengers",
      cost: "$300/day"
    },
    {
      fleet: "2",
      image: "https://media.istockphoto.com/id/2219380457/photo/yellow-lamborghini-urus-2019-suv-car-luxury-car-of-lamborghini-urus-suv-type-car-of.jpg?s=612x612&w=0&k=20&c=ejNe7p_8049fTgDdasTHpBZQ2zVYq_o3LPO6LbBhL9E=",
      name: "Lamborghini Urus",
      shape: "Super SUV",
      capacity: "4 passengers",
      cost: "$700/day"
    },
    {
      fleet: "25",
      image: "https://media.istockphoto.com/id/458309695/photo/porsche-cayenne.jpg?s=612x612&w=0&k=20&c=NlkuEdWe4v8s7XhJb_px8ye9XWouX_qByAM0-kaV8EA=",
      name: "Porsche Cayenne",
      shape: "Luxury SUV",
      capacity: "5 passengers",
      cost: "$320/day"
    },
    {
      fleet: "25",
      image: "https://media.istockphoto.com/id/2170479132/photo/american-hummer-h2-off-road-vehicle-with-large-diameter-chrome-wheels.jpg?s=612x612&w=0&k=20&c=lT6IZTKkTRX_OwqOWO3aPUFv78siUEeZKWjFYVwv8jI=",
      name: "Hummer",
      shape: "Full-size SUV",
      capacity: "6 passengers",
      cost: "$250/day"
    },
    {
      fleet: "15",
      image: "https://media.istockphoto.com/id/1081815496/photo/nissan-patrol.jpg?s=612x612&w=0&k=20&c=3Dn7W7QULPPzqYDuCiisfeR8Jxu1EBOd1YJuXHarkQg=",
      name: "Nissan Patrol",
      shape: "Luxury SUV",
      capacity: "7 passengers",
      cost: "$220/day"
    }
  ];

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">Choose the perfect car for your trip</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-4">
            <h3 className="text-sm text-gray-400 mb-2">Available: {car.fleet}</h3>
            <img src={car.image} alt={car.name} className="rounded-lg w-full h-48 object-cover mb-3" />
            
            {/* Name and Shape in one row */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <span className="text-sm text-gray-400">{car.shape}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300">{car.capacity}</p>
            <p className="text-base font-semibold text-green-400">{car.cost}</p>
            </div>
            {/* Smaller button */}
            <Link 
              to="/" 
              className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
            >
              Reserve
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
