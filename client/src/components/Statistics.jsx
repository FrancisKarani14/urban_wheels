import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Statistics() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Customers', icon: '😊' },
    { number: '50+', label: 'Cars Available', icon: '🚗' },
    { number: '24/7', label: 'Support', icon: '💬' },
    { number: '5+', label: 'Years Experience', icon: '⭐' }
  ];

  return (
    <div className="bg-[#0A0A0A] px-8 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#31C950] mb-12" data-aos="fade-up">
        Our Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#171717] p-8 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-bold text-[#FFD230] mb-2">{stat.number}</h3>
            <p className="text-gray-300 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
