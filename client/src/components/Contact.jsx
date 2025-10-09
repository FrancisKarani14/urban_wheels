import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    pickup: '',
    dropoff: '',
    car: '',
    service: '',
    message: '',
    agree: false,
  });

  const cars = [
    "Toyota Alphard",
    "Toyota Vellfire",
    "Mercedes Benz GLE",
    "Range Rover Sport",
    "Mercedes Benz S-Class",
    "Lamborghini Urus",
    "Porsche Cayenne",
    "Hummer",
    "Nissan Patrol"
  ];

  const services = [
    "Chauffeur Service",
    "One Way Transfer",
    "Round Trip",
    "Self Drive",
    "Airport Pickup",
    "Business Car Rental",
    "Luxury Car Rental",
    "Corporate Solutions",
    "Events",
    "Long Term Rental"
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Booking request submitted 🚗✅");

    setFormData({
      name: '',
      email: '',
      contact: '',
      pickup: '',
      dropoff: '',
      car: '',
      service: '',
      message: '',
      agree: false,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4">

      {/* Image Side */}
      <img 
        src="https://media.istockphoto.com/id/1597068908/photo/porsche-panamera-hybrid-electric-car.jpg?s=612x612&w=0&k=20&c=PETfzIJUGijdmFLembrlUzYthRMw46JH3FAzTx5PmeY=" 
        alt="porche panamera" 
        className="rounded-lg shadow-sm object-cover h-full"
        data-aos="fade-right" // slides in from right
      />

      {/* Form Side */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-md border border-gray-200 text-sm"
        data-aos="fade-left" // slides in from left
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

        <label className="block mt-3 mb-1 font-medium text-gray-700 text-sm">Select Car</label>
        <select name="car" value={formData.car} onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3" required>
          <option value="">-- Choose a Car --</option>
          {cars.map((car, index) => (
            <option key={index} value={car}>{car}</option>
          ))}
        </select>

        <label className="block mb-1 font-medium text-gray-700 text-sm">Select Service</label>
        <select name="service" value={formData.service} onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3" required>
          <option value="">-- Choose a Service --</option>
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>

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

export default BookingForm;
