"use client";
// import { FaCalendarCheck, FaChair, FaUsers, FaHandshake, FaShieldAlt, FaQrcode } from "react-icons/fa";
import Image from "next/image";

const features = [
  { imgSrc: "/images/planning.png", title: "Personalized Wedding Planning", description: "Get expert-recommended wedding plans tailored to your style and budget." },
  { imgSrc: "/images/chair.png", title: "Interactive Venue Floor Plans", description: "Customize your wedding layout with an intuitive drag-and-drop tool." },
  { imgSrc: "/images/project.png", title: "Seamless Guest List Management", description: "Add, organize, and track RSVPs easily with our interactive guest list system." },
  { imgSrc: "/images/qr.png", title: "Effortless Photo Sharing", description: "Guests can upload wedding photos via QR code for a hassle-free sharing experience." },
  { imgSrc: "/images/collaborate.png", title: "Vendor & Merchant Integration", description: "Connect with top wedding vendors for catering, decorations, photography, and more." },
  { imgSrc: "/images/privacy.png", title: "Secure & Scalable Platform", description: "Enjoy a secure, high-performance service designed to grow with your needs." },
];



// const features = [
//   { icon: <FaCalendarCheck size={100} />, title: "Personalized Wedding Planning", description: "Get expert-recommended wedding plans tailored to your style and budget." },
//   { icon: <FaChair size={100} />, title: "Interactive Venue Floor Plans", description: "Customize your wedding layout with an intuitive drag-and-drop tool." },
//   { icon: <FaUsers size={100} />, title: "Seamless Guest List Management", description: "Add, organize, and track RSVPs easily with our interactive guest list system." },
//   { icon: <FaQrcode size={100} />, title: "Effortless Photo Sharing", description: "Guests can upload wedding photos via QR code for a hassle-free sharing experience." },
//   { icon: <FaHandshake size={100} />, title: "Vendor & Merchant Integration", description: "Connect with top wedding vendors for catering, decorations, photography, and more." },
//   { icon: <FaShieldAlt size={100} />, title: "Secure & Scalable Platform", description: "Enjoy a secure, high-performance service designed to grow with your needs." },
// ];

export default function EventFeatures() {
  return (
    <section className="mt-10 py-10 px-30 bg-[#F8F8F8] text-center font-montserrat">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-black">Create Your Unique Event Experience</h2>
        <p className="mt-3 text-gray-700 text-sm font-normal leading-relaxed max-w-3xl mx-auto">
          RSVP is dedicated to helping couples create their dream wedding effortlessly. <br />Our platform provides a seamless, stress-free experience, guiding you from planning to execution.
          <br />
          Whether it’s managing guests, creating floor plans, or preserving wedding memories, we simplify every step of your journey.
        </p>

        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border-2 border-[#ac263e] shadow-md hover:shadow-lg transition 
              flex flex-col items-center justify-center text-center h-[350px]" // Centering Content
            >
              {/* Feature Image */}
              <Image
                src={feature.imgSrc}
                alt={feature.title}
                width={100} 
                height={100} 
                className="mb-8"
              />
              <h3 className="text-lg font-semibold text-[#ac263e]">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="mt-10">
          <button className="mt-4 bg-[#ac263e] text-white text-sm px-10 py-3 rounded-full font-semibold hover:bg-[#911f34] transition text-md">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}