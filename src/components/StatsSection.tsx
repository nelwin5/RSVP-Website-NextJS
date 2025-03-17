"use client";
import Image from "next/image";
import { FaFolder, FaCloudUploadAlt, FaCaretRight } from "react-icons/fa";

const stats = [
  {
    label: "Success Stories",
    value: "100+",
    iconType: "image",
    images: [
      "/images/user1.jpg",
      "/images/user2.jpg",
      "/images/user3.jpg",
    ],
  },
  {
    label: "Guests Managed",
    value: "50K+",
    iconType: "icon",
    icon: <FaFolder size={60} className="text-[#ac263e]" />,
  },
  {
    label: "Photos Uploaded",
    value: "10K+",
    iconType: "icon",
    icon: <FaCloudUploadAlt size={60} className="text-[#ac263e]" />,
  },
  {
    label: "Get Started",
    value: "Create",
    iconType: "icon",
    icon: <FaCaretRight size={20} className="text-[#ac263e] absolute top-4 right-4" />, // Move caret to upper-left
  },
];

export default function StatsSection() {
  return (
    <section className="relative bg-white py-5 font-montserrat">
      {/* Half-Red Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#ac263e]"></div>

      {/* Stats Container */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between relative 
                       border border-gray-200 overflow-hidden transform translate-y-[-30px] h-[160px] w-[270px]"
          >
            {/* Move Caret to Upper-Left for "Get Started" */}
            {stat.label === "Get Started" ? (
              <div className="absolute top-4 right-4">{stat.icon}</div>
            ) : (
              <div className="absolute bottom-6 right-6">{stat.icon}</div>
            )}

            {/* Profile Images for "Success Stories" */}
            {stat.iconType === "image" && (
              <div className="absolute bottom-6 right-6 flex -space-x-2">
                {stat.images?.map((img, idx) => (
                  <div key={idx} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={img}
                      alt={`User ${idx + 1}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Label & Value (At the Bottom) */}
            <div className="absolute bottom-6 left-6 text-left">
              <h3 className="text-xs font-semibold text-gray-700">{stat.label}</h3>
              <p className="text-[30px] font-extrabold text-[#ac263e] mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
