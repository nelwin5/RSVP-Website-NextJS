"use client";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F8] py-12 font-montserrat mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Section - Newsletter */}
        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-bold text-black">Subscribe for Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">Our clients love the memories we help create!</p>
          <Image 
            src="/images/logo.png" 
            alt="RSVP Logo" 
            width={40} 
            height={20} 
            className="text-[#ac263e]"
          />
        </div>

        {/* Right-aligned Newsletter Input and Links */}
        <div className="flex flex-col items-end">
          <div className="text-right">
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-68 px-4 py-2 border border-gray-400 rounded-md focus:outline-none text-gray-500 text-sm"
                />
                <button className="bg-[#ac263e] border border-[#ac263e] text-white px-6 py-2 rounded-md hover:bg-[#911f34] transition text-sm">
                  Join
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 self-start">We respect your privacy and protect your information</p>
            </div>
          </div>

          {/* Links Section Moved Below Newsletter */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-m font-bold text-black">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-[#ac263e] transition">Home</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">Event Templates</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-m font-bold text-black">Contacts</h3>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>X</li>
                <li>Youtube</li>
              </ul>
            </div>
            <div>
              <h3 className="text-m font-bold text-black">Legal</h3>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-[#ac263e] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">Term of Use</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">User Agreement</a></li>
                <li><a href="#" className="hover:text-[#ac263e] transition">Data Protection</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 mt-8 border-t border-[#ac263e] pt-4 flex justify-between items-center text-xs text-gray-500">
        <p>© 2025 INNO. All rights reserved</p>
        <div className="flex space-x-4 text-xl">
          <a href="#" className="text-gray-600 hover:text-[#ac263e] transition"><FaFacebook /></a>
          <a href="#" className="text-gray-600 hover:text-[#ac263e] transition"><FaInstagram /></a>
          <a href="#" className="text-gray-600 hover:text-[#ac263e] transition"><FaXTwitter /></a>
          <a href="#" className="text-gray-600 hover:text-[#ac263e] transition"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
}
