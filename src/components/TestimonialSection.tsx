"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "February 14, 2024 - Wedding",
    review:
      "This service made my wedding planning seamless! Highly recommend. It helped me so much that I can’t imagine planning without it. The tools are easy to use, and everything was well organized.",
    rating: 5,
    image: "/images/user1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Smith Enterprise",
    review:
      "An absolute game-changer for our corporate events. It has truly elevated the entire experience, making it more engaging and memorable. Our team absolutely loves it, and it has set a new standard!",
    rating: 5,
    image: "/images/user2.jpg",
  },
  {
    name: "Michael Brown",
    role: "Luxury Wedding Planner",
    review:
      "I have worked with multiple wedding platforms, but this one stands out. The guest management and seating chart features are lifesavers!",
    rating: 5,
    image: "/images/user3.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Wedding Coordinator",
    review:
      "Flawless execution from start to finish. Our clients loved how easy it was to upload and share memories of their big day!",
    rating: 5,
    image: "/images/user1.jpg",
  },
  {
    name: "David Wilson",
    role: "Event Organizer",
    review:
      "The RSVP system and guest tracking made managing large-scale events effortless. Highly recommended for professionals in the industry.",
    rating: 5,
    image: "/images/user2.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-12 bg-[#ac263e] text-white font-montserrat">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Testimonials</h2>

        {/* Testimonial Container with Fixes */}
          <div className="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(current, current + 2).map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white text-black p-8 rounded-xl shadow-md flex flex-col space-y-4 h-[350px] 
                  ${testimonials.length % 2 !== 0 && current === testimonials.length - 1 ? "mx-auto" : ""}`}
              >
                {/* Profile + Name + Role + Rating (Aligned in a Row) */}
                <div className="flex items-center space-x-4 px-10 pt-5">
                  {/* Profile Image - Ensuring Perfect Circle */}
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={70}
                    height={70}
                    className="rounded-full object-cover border-2 border-gray-300"
                    style={{ width: "80px", height: "80px" }}
                  />

                  {/* Name + Role + Rating (Stacked & Centered) */}
                  <div className="flex flex-col items-start"> 
                    <h3 className="text-lg font-semibold text-black">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1 text-yellow-500 space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text (Always Aligned at the Bottom) */}
                <p className="text-left text-[#999999] text-sm leading-relaxed mt-5 px-12 mx-auto max-w-md">
                  {testimonial.review}
                </p>


              </div>
            ))}
          </div>

        {/* Dots for Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition ${
                current / 2 === index ? "bg-white" : "bg-gray-400 opacity-50"
              }`}
              onClick={() => setCurrent(index * 2)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
