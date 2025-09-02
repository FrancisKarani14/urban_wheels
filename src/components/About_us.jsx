import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About_us() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // animate only once
  }, []);

  return (
    <div className="bg-[#0A0A0A] px-8 py-16 space-y-16">

      {/* First Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://media.istockphoto.com/id/2209179849/photo/volvo-v90.jpg?s=612x612&w=0&k=20&c=cSiEIWXxSrj0TSJmIf56rb8Srul56ruGzFW0JO3-6x0="
          alt="volvo"
          className="h-64 w-full object-cover rounded-2xl shadow-lg"
          data-aos="fade-right" // image slides from right
        />

        <p
          className="text-[#31C950] text-3xl md:text-4xl font-extrabold leading-snug"
          data-aos="fade-left" // text slides from left
        >
          We are committed to providing smooth, reliable, and professional car rental services.
        </p>
      </section>

      {/* Second Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div
          className="bg-[#171717] p-6 rounded-2xl shadow-lg"
          data-aos="fade-right" // text block slides from right
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Your trusted partner in reliable car rental
          </h2>

          <p className="text-lg text-[#FFD230] font-semibold mb-6">
            We take pride in our fleet, customer service, and enabling:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#31C950] mb-1">
                Easy booking process
              </h3>
              <p className="text-gray-300 leading-relaxed">
                At Urban Wheels, we make booking simple and hassle-free, so you’re on the road in minutes.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#31C950] mb-1">
                Convenient Pick-up & Return
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We’ve made car rentals stress-free with a pick-up and return process that saves you time, ensures flexibility, and makes your journey smoother from start to finish.
              </p>
            </div>
          </div>
        </div>

        <img
          src="https://media.istockphoto.com/id/1814511288/photo/happy-multiracial-couple-testing-new-car-in-showroom.jpg?s=612x612&w=0&k=20&c=NlVzdPK_Wts7fPerXPWtDxMhQlJaEZF-_fCJaWL0o5Y="
          alt="transaction"
          className="h-80 w-full object-cover rounded-2xl shadow-lg"
          data-aos="fade-left" // image slides from left
        />
      </section>
    </div>
  );
}

export default About_us;
