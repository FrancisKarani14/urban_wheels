import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      name: 'Sarah Wanjiru',
      role: 'Business Traveler',
      text: 'Urban Wheels made my business trip so easy! The booking process was seamless and the car was in perfect condition.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Michael Omondi',
      role: 'Family Vacation',
      text: 'Rented an SUV for our family vacation. Great service, fair prices, and the pick-up was super convenient!',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=13'
    },
    {
      name: 'Emily Naserian',
      role: 'Weekend Getaway',
      text: 'Best car rental experience ever! The staff was friendly and the car exceeded my expectations.',
      rating: 5,
      image: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] px-8 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#31C950] mb-4" data-aos="fade-up">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-400 mb-12 text-lg" data-aos="fade-up">
        Real experiences from real customers
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#171717] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                <p className="text-[#FFD230] text-sm">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-[#FFD230] text-xl">⭐</span>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
