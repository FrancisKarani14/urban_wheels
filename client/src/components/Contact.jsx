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
    start_date: '',
    end_date: '',
    amount_paid: '',
    car: carFromState ? carFromState.model : '',
    agree: false,
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (carFromState) {
      setFormData((prev) => ({
        ...prev,
        car: carFromState.model,
        amount_paid: carFromState.price_per_day || '',
      }));
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
      if (!carFromState) {
        alert("No car selected.");
        return;
      }

      // ✅ Create reservation
      const newReservation = {
        user_id: 1, // for now, a static user or replace with logged-in user's id
        car_id: carFromState.id,
        start_date: formData.start_date,
        end_date: formData.end_date,
        amount_paid: formData.amount_paid,
        pickup_location: formData.pickup,
        status: "pending",
      };

      const res = await fetch("http://localhost:5000/reservations/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });

      if (!res.ok) throw new Error("Reservation failed");

      // ✅ Mark car unavailable
      await fetch(`http://localhost:5000/cars/update/${carFromState.id}`, {
  method: "PUT", // 👈 your Flask endpoint uses PUT, not PATCH
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ available: false }),
});


      alert("✅ Reservation successfully submitted!");

      setFormData({
        name: '',
        email: '',
        contact: '',
        pickup: '',
        start_date: '',
        end_date: '',
        amount_paid: '',
        car: '',
        agree: false,
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Something went wrong while submitting reservation.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 md:p-10" id="contact-form">

      {/* Image Side */}
      <img 
        src="https://media.istockphoto.com/id/1597068908/photo/porsche-panamera-hybrid-electric-car.jpg?s=612x612&w=0&k=20&c=PETfzIJUGijdmFLembrlUzYthRMw46JH3FAzTx5PmeY=" 
        alt="porsche panamera" 
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
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange}
            className="p-2 border rounded-md text-sm" required />
          <input type="date" name="end_date" value={formData.end_date} onChange={handleChange}
            className="p-2 border rounded-md text-sm" required />
        </div>

        {/* Prefilled Car Field */}
        <label className="block mt-3 mb-1 font-medium text-gray-700 text-sm">Selected Car</label>
        <input
          type="text"
          name="car"
          value={formData.car}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3 bg-gray-100"
          readOnly
        />

        <label className="block mb-1 font-medium text-gray-700 text-sm">Amount to Pay</label>
        <input
          type="number"
          name="amount_paid"
          value={formData.amount_paid}
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm mb-3"
          required
        />

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
