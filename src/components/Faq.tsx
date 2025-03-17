"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I customize my event template?",
    answer: "You can customize your event template by navigating to the 'Templates' section and selecting the design options available.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for new users to explore our features.",
  },
  {
    question: "Can I share my event page with guests?",
    answer: "Absolutely! You can share your event page by copying the link from your dashboard.",
  },
  {
    question: "How do I manage guest RSVPs?",
    answer: "You can manage guest RSVPs from the 'Guest List' section of your dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 flex justify-center font-['Montserrat',sans-serif] bg-white">
      {/* Half-Red Background */}
      {/* <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ac263e]"></div> */}
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.2)] px-8 py-12 z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-black mb-10">Frequently Asked Questions</h2>

        {/* Accordion */}
        <div className="w-full space-y-4 px-15">
          {faqs.map((faq, index) => (
            
              <div key={index} className={`border border-[#ac263e] overflow-hidden rounded-lg`}>

              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-4 px-6 text-sm font-normal text-black bg-white rounded-t-lg hover:bg-gray-100 transition"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform text-[#ac263e] ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="p-6 border-t border-[#ac263e] bg-white text-sm text-black rounded-b-xl">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-8">
          <p className="text-black font-semibold text-md">Still have questions?</p>
          <p className="text-gray-600 text-sm mb-6">We&apos;re here to help you with any inquiries</p>
          <button className="bg-[#ac263e] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#911f34] transition text-sm">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
