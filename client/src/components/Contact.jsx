import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';

function Contact() {
  const location = useLocation();
  const carFromState = location.state?.car || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    pickup: '',
    dropoff: '',
    car: carFromState ? carFromState.model : '',
    message: '',
    agree: false,
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    // Prefill car if passed
    if (carFromState) {
      setFormData((prev) => ({ ...prev, car: carFromState.model }));
    }
  }, [carFromState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Mark car as unavailable
      if (carFromState) {
        await fetch(`http://localhost:5000/cars/${carFromState.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ available: false }),
        });
      }

      console.log("Form Data Submitted:", formData);
      alert("Booking request submitted 🚗✅");

      setFormData({
        name: '',
        email: '',
        contact: '',
        pickup: '',
        dropoff: '',
        car: '',
        message: '',
        agree: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 md:p-10" id="contact-form">

      {/* Image Side */}
      <img 
        src="https://media.istockphoto.com/id/1597068908/photo/porsche-panamera-hybrid-electric-car.jpg?s=612x612&w=0&k=20&c=PETfzIJUGijdmFLembrlUzYthRMw46JH3FAzTx5PmeY=" 
        alt="porche panamera" 
        className="rounded-lg shadow-sm object-cover h-full w-full"
        data-aos="fade-right"
      />

      {/* Form Side */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg mx-auto border border-gray-200 text-sm"
        data-aos="fade-left"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Car Booking Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            placeholder="Full Name" className="p-2 border rounded-md text-sm" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="Email" className="p-2 border rounded-md text-sm" required />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange}
            placeholder="Contact Number" className="p-2 border rounded-md text-sm" required />
          <input type="text" name="pickup" value={formData.pickup} onChange={handleChange}
            placeholder="Pickup Location" className="p-2 border rounded-md text-sm" required />
          <input type="text" name="dropoff" value={formData.dropoff} onChange={handleChange}
            placeholder="Drop-off Location" className="p-2 border rounded-md text-sm" required />
        </div>

        {/* Prefilled Car Field */}
        <label className="block mt-3 mb-1 font-medium text-gray-700 text-sm">Selected Car</label>
        <input
          type="text"
          name="car"
          value={formData.car}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3"
          readOnly
        />

        <label className="block mb-1 font-medium text-gray-700 text-sm">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3"
          placeholder="Add any special request..." rows="3"></textarea>

        <div className="flex items-center mb-3 text-sm">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange}
            className="mr-2 h-4 w-4" required />
          <label>I agree to the terms & conditions</label>
        </div>

        <button type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm transition">
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Contact;
