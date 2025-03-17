"use client";
import { useRef } from "react";
import Image from "next/image";

const events = [
  { src: "/images/event1.jpg", alt: "Wedding Event" },
  { src: "/images/event2.jpg", alt: "Indoor Party" },
  { src: "/images/event3.jpg", alt: "Outdoor Party" },
  { src: "/images/event4.jpg", alt: "Engagement Party" },
  { src: "/images/event5.jpg", alt: "Birthdays" },
];

export default function FeaturedEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-black mb-6">Our Featured Events</h2>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-[#ac263e] text-white rounded-full shadow-md opacity-40 hover:opacity-100 transition duration-300 hidden md:block z-10"
          >
            ◀
          </button>

          {/* Horizontal Scroll Wrapper */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto overflow-y-hidden px-4 scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer / Edge
            }}
          >
            {events.map((event, index) => (
              <div
                key={index}
                className="relative shrink-0 w-[400px] h-[500px] rounded-2xl shadow-lg group 
                           transition-transform duration-300 hover:scale-105"
              >
                {/* Image */}
                <Image
                  src={event.src}
                  alt={event.alt}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Overlay (Fully Hidden Until Hover) */}
                <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl"></div>

                {/* Text & Button (Hidden Until Hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold">{event.alt}</h3>
                  <button className="mt-3 px-5 py-2 bg-white text-[#ac263e] rounded-full font-semibold hover:bg-gray-200 transition">
                    Check Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-[#ac263e] text-white rounded-full shadow-md opacity-40 hover:opacity-100 transition duration-300 hidden md:block z-10"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
