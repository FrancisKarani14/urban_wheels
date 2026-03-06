import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CTABanner() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#171717] px-8 py-16 w-full" data-aos="fade-up">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#F1F5F9] mb-4">
          Ready to Hit the Road?
        </h2>
        <p className="text-xl text-[#F1F5F9] mb-8">
          Book your perfect car today and experience the Urban Wheels difference!
        </p>
        <Link
          to="/book"
          className="inline-block bg-[#0A0A0A] text-[#F1F5F9] px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default CTABanner;
