import Link from "next/link";
import Image from "next/image";

export default function TemplateCards() {
  const templates = [
    {
      image: "/template1.jpg",
      title: "Elegant Wedding Theme",
      description: "A timeless and elegant wedding theme with a classic touch.",
      link: "/templates/template1", // ✅ Link to Template 1 Page
    },
    {
      image: "/template2.jpg",
      title: "Rustic Charm",
      description: "A beautiful rustic wedding theme with a cozy, natural feel.",
      link: "#", // Placeholder for future template
    },
    {
      image: "/template3.jpg",
      title: "Modern Chic",
      description: "A sleek and contemporary wedding theme for a stylish celebration.",
      link: "#", // Placeholder for future template
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-black mb-6">Select a Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div className="relative w-full h-52">
              <Image
                src={template.image}
                alt={template.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{template.title}</h2>
            <p className="text-gray-600 mt-2">{template.description}</p>
            <Link href={template.link}>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Select This Template
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
