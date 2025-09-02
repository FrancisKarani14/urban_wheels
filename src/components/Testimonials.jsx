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
    {
      testimony: "I loved the chauffeur service. Professional, on time, and super comfortable. Definitely using again!",
      image: "https://media.istockphoto.com/id/2167876122/photo/african-american-woman-smiling-confidently-outdoors-in-a-park-setting-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=nP7IbGBO8iZRy_lbGhi7yK2iowvh0d8Qc_IqH9ubmkY=",
      name:"Sarah M"
    },
    {
      testimony: "The long-term rental was perfect for my stay in Nairobi. Flexible terms and great customer support.",
      image: "https://media.istockphoto.com/id/2226838709/photo/portrait-of-a-handsome-middle-aged-black-man.jpg?s=612x612&w=0&k=20&c=7vEVixvtgO1G5qYlJc6ANkIEjiTeyP0TzLrjizisEzw=",
      name:"Daniel W"
    },
    {
      testimony: "I booked for my wedding day and the car was stunning. Everyone kept asking where I got it from.",
      image: "https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=",
      name:"Aisha L"
    },
    {
      testimony: "I appreciated how quick the pick-up and return process was. Saved me so much time.",
      image: "https://media.istockphoto.com/id/1347495868/photo/smiling-african-american-man-wearing-glasses.jpg?s=612x612&w=0&k=20&c=QMCbWu-AOfLDkQMsX-qX2xHFZAL56tx_uVucZ5rBxv8=",
      name:"Brian O"
    },
    {
      testimony: "Luxury cars at affordable rates? I was honestly impressed. The drive felt premium all through.",
      image: "https://media.istockphoto.com/id/2178340044/photo/portrait-of-confident-mid-adult-businesswoman.jpg?s=612x612&w=0&k=20&c=msARCeYdvd9cvduMwJUgT1fY6Rl7lG0NRxZ56fzdUFs=",
      name:"Emily R."
    },
    {
      testimony: "I needed a one-way rental, and Urban Wheels handled it perfectly. Zero hassle.",
      image: "https://media.istockphoto.com/id/1289461335/photo/portrait-of-a-handsome-black-man.jpg?s=612x612&w=0&k=20&c=gDibbpmkeV04ta3ociwAgpqcjdeU5sI1nnd78wrnz-g=",
      name:"Peter N."
    },
    {
      testimony: "The customer service team really stood out—friendly, responsive, and always ready to help.",
      image: "https://media.istockphoto.com/id/1353378620/photo/cheerful-african-woman-wearing-trendy-red-headscarf.jpg?s=612x612&w=0&k=20&c=G1uMb3xggrhK2AqXqsBJe-oL51eQDMlC7JLeS_6Yoqc=",
      name:"Grace T."
    },
    {
      testimony: "I hired a driver for a corporate event, and it was the best decision. Smooth ride, classy experience.",
      image: "https://media.istockphoto.com/id/1178153005/photo/portrait-of-a-handsome-casual-businessman-wearing-black-eyeglasses-in-office-smiling.jpg?s=612x612&w=0&k=20&c=9dgLzQnifAyz7KKCGYqnqffcqm6cfGX0LkFXi1iwOVw=",
      name:"James K."
    },
    {
      testimony: "Urban Wheels is my go-to for car rentals now. Reliable, trustworthy, and always exceeding expectations.",
      image: "https://media.istockphoto.com/id/2195534339/photo/smiling-afro-girl-in-eyeglasses-posing-over-grey-background.jpg?s=612x612&w=0&k=20&c=-Ap4orSGl_Qc0rTJj9_rYKiMKqPY_CYRRDaBW87atCM=",
      name:"Linda S."
    }
  ];

 const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4, // default for large screens
    slidesToScroll: 1,
    autoplay: true,         // ✅ auto slide
    autoplaySpeed: 3000,    // ✅ slide every 3s
    pauseOnHover: true,     // ✅ pause when hovered
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
