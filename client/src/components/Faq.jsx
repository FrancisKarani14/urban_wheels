import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "How do I book a car?",
      answer: "You can book easily online through our website or by contacting our support team."
    },
    {
      question: "Do you offer one-way rentals?",
      answer: "Yes, you can pick up a car in one city and drop it off in another."
    },
    {
      question: "Is insurance included?",
      answer: "Yes, all rentals come with basic insurance, with options for full coverage."
    },
    {
      question: "Can I rent with a driver?",
      answer: "Of course! We provide professional drivers upon request."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#09090B] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Heading side */}
        <div className="flex items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] leading-snug">
            Frequently Asked <br /> Questions
          </h2>
        </div>

        {/* FAQ questions side */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#27272A] shadow-md rounded-xl p-5 border border-black transition hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-[#31C950]" />
                ) : (
                  <Plus className="w-6 h-6 text-[#31C950]" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-3 text-white">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
