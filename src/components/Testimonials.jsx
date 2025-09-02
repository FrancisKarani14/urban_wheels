import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials() {
  const testimonials = [
    {
      testimony: "Urban Wheels made my business trip stress-free. The booking was smooth, and the car was spotless.",
      image: "https://media.istockphoto.com/id/1312105172/photo/happy-african-man-looking-at-camera-indoors-at-home-focus-on-face.jpg?s=612x612&w=0&k=20&c=oFGfCkq-z0tDi-5LzRqF_nOEjWYP5h6ZTPTLMT7oUJk=",
      name:"Michael K"
    },
    // ... rest of the testimonials
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // large tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768, // tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-[#CAD5E2] py-10">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
              <p className="text-gray-700 italic mb-4">"{testimonial.testimony}"</p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
