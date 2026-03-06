import React, { useEffect } from 'react';
import { Users, Car, Headphones, Award } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Statistics() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Customers', Icon: Users },
    { number: '50+', label: 'Cars Available', Icon: Car },
    { number: '24/7', label: 'Support', Icon: Headphones },
    { number: '5+', label: 'Years Experience', Icon: Award }
  ];

  return (
    <div className="bg-black px-8 py-16 w-full">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#31C950] mb-12" data-aos="fade-up">
        Our Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.Icon;
          return (
            <div
              key={index}
              className="bg-[#171717] p-8 rounded-2xl text-center shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <IconComponent className="w-12 h-12 mx-auto mb-4 text-[#31C950]" />
              <h3 className="text-4xl font-bold text-[#FFD230] mb-2">{stat.number}</h3>
              <p className="text-gray-300 text-lg">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Statistics;
