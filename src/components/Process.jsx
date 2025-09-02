import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Process() {
  const rules = [
    { name: "Age Requirement", description: "Minimum age should be 21 years" },
    { name: "Driving License", description: "Valid driving license is required" },
    { name: "Payment Method", description: "Credit or debit card must be provided" },
    { name: "Insurance", description: "Rental insurance included for safety" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Process Steps */}
      <div className="bg-[#0A0A0A] grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-6 md:p-12">
        
        {/* Image Column */}
        <div data-aos="fade-right" className="flex justify-center md:justify-start">
          <img 
            src="https://media.istockphoto.com/id/2199063527/photo/car-seller-shaking-hands-with-buyers-after-successful-deal-selling-auto-in-dealership-center.jpg?s=612x612&w=0&k=20&c=U_sh2RMkDsSwgHBq6s7gtpYEVI8l7n4s4uSP0vSYo20=" 
            alt="process image" 
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Text Column */}
        <section data-aos="fade-left" className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <h1 className="text-[#FAFAFA] font-bold text-3xl md:text-4xl">
            Rent your car in 3 easy steps
          </h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-[#FAFAFA] font-semibold text-xl">🚗 Choose Your Car</h2>
              <p className="text-sm md:text-base text-gray-300">
                Explore our fleet and find the vehicle that perfectly suits your preference.
              </p>
            </div>

            <div>
              <h2 className="text-[#FAFAFA] font-semibold text-xl">📅 Book Online</h2>
              <p className="text-sm md:text-base text-gray-300">
                Instantly book through our customer-friendly platform. Select dates and confirm your reservation.
              </p>
            </div>

            <div>
              <h2 className="text-[#FAFAFA] font-semibold text-xl">🗝 Pick & Drive</h2>
              <p className="text-sm md:text-base text-gray-300">
                Head to your pickup location, grab your keys, and enjoy a smooth ride with a well-maintained Urban_Wheel vehicle.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Rental Terms */}
      <div className="flex bg-[#0A0A0A] py-10 px-5 justify-center">
        <section className="bg-[#171717] flex flex-col md:flex-row gap-10 p-8 rounded-2xl w-full max-w-6xl">
          
          {/* Left side */}
          <div className="flex-1 space-y-5" data-aos="fade-right">
            <h2 className="text-4xl font-bold text-white mb-3">Rental Terms</h2>
            <p className="text-gray-300 text-lg">
              We are here to help you find the car of your choice.
            </p>

            <div className="flex items-center gap-5">
              <img 
                src="https://media.istockphoto.com/id/1366350434/photo/shot-of-a-young-woman-using-a-headset-and-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=XrTKzcQDnbGlL8-wh_9APuXJyKJqFGN5KwXb1PlR-co=" 
                alt="Customer care" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white">Emily Jane</h3>
                <h4 className="text-gray-300 text-lg">Your Personal Rental Assistant</h4>
              </div>
            </div>

            <button className="bg-[#F8FAFC] text-[#0C0A09] py-2 px-4 rounded-2xl cursor-pointer hover:bg-gray-200 transition">
              Call Us
            </button>
          </div>

          {/* Right side rules */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="bg-[#262626] p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">{rule.name}</h3>
                <p className="text-gray-400 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Process;
