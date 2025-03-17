"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="py-1 bg-white flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.2)] px-8 py-10 flex flex-col items-center">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-black mb-8">Contact Form</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6 px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ac263e] outline-none text-sm text-gray-700 placeholder-[#ac263e]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ac263e] outline-none text-sm text-gray-700 placeholder-[#ac263e]"
              required
            />
          </div>

          <textarea
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            rows={4}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ac263e] outline-none text-sm text-gray-700 placeholder-[#ac263e]"
            required
          />

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-[#ac263e] text-white text-sm px-10 py-3 rounded-full font-semibold hover:bg-[#911f34] transition text-md"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
