"use client";

import Image from "next/image";

export default function VendorCards() {
  const vendors = [
    {
      image: "/vendor1.jpg",
      title: "Elegant Weddings Venue",
      description:
        "Located in the heart of the city, our venue offers a charming setting for your special day. Pricing starts at $5000",
      rating: 5,
    },
    {
      image: "/vendor2.jpg",
      title: "Capture Moments Photography",
      description:
        "Expert photographers to capture every moment of your big day. Pricing starts at $2000",
      rating: 5,
    },
    {
      image: "/vendor3.jpg",
      title: "Gourmet Catering Co.",
      description:
        "Delicious gourmet catering for your wedding. Menus start at $100 per guest.",
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-black mb-6">Merchant</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div className="relative w-full h-52">
              <Image
                src={vendor.image}
                alt={vendor.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{vendor.title}</h2>
            <p className="text-gray-600 mt-2">{vendor.description}</p>
            <div className="mt-2 text-yellow-500">★★★★★</div>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              Contact Vendor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
