"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex justify-center bg-white py-14 font-montserrat">
      <div className="absolute bottom-0 w-full h-1/2 bg-[#ac263e]"></div>
      {/* Container for the Hero Section */}
      <div className="relative w-[90%] max-w-[1326px] h-[80vh] rounded-xl overflow-hidden mt-[-40px]">
        {/* Background Image */}
        <Image
            src="/images/hero-bg.png"
            alt="Wedding Event"
            layout="fill"
            objectFit="cover"
            objectPosition="center 100%"
            className="mx-auto"
        />

        {/* Content (Centered) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
            {/* Logo Image */}
            <Image
            src="/images/logo.png"
            alt="RSVP Logo"
            width={100} 
            height={50}
            className="mb-4"
            />

        <p className="text-sm md:text-lg font-light tracking-widest">
        Preserve Your Unforgettable Memories
        </p>

    {/* Buttons */}
    {/* Buttons */}
<div className="mt-6 flex items-center space-x-4">
  <Link href="/learn-more">
    <button className="bg-transparent border-2 border-[#ac263e] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:border-[#ac263e] hover:text-[#ac263e] transition">
      Book Your Event
    </button>
  </Link>

  {/* OR Text */}
  <span className="text-white font-semibold">or</span>

  <Link href="/get-started">
    <button className="bg-[#ac263e] border-2 border-[#ac263e] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#911e34] hover:border-[#911e34] transition">
      Start Planning →
    </button>
  </Link>
</div>


      </div>
    </div>

    </section>
  );
}
