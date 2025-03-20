"use client"; // Ensures this runs as a client component

import { useState } from "react";
import Image from "next/image";

const layouts: Record<string, { id: number; name: string; image: string }[]> = {
  "50 Guests": [
    { id: 1, name: "50 Guests - Layout 1", image: "/layout-50-1.png" },
    { id: 2, name: "50 Guests - Layout 2", image: "/layout-50-2.png" },
  ],
  "80 Guests": [
    { id: 3, name: "80 Guests - Layout 1", image: "/layout-80-1.png" },
    { id: 4, name: "80 Guests - Layout 2", image: "/layout-80-2.png" },
  ],
  "100 Guests": [
    { id: 5, name: "100 Guests - Layout 1", image: "/layout-100-1.png" },
    { id: 6, name: "100 Guests - Layout 2", image: "/layout-100-2.png" },
  ],
};

export default function SeatingLayouts() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedLayout(null);
    setUploadedImage(null);
  };

  const handleSelect = (layoutId: number) => {
    setSelectedLayout(layoutId);
    setUploadedImage(null);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setUploadedImage(imageUrl);
      setSelectedLayout(null);
      setSelectedCategory(null);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedLayout(null);
    setUploadedImage(null);
  };

  const selectedLayoutData = selectedCategory
    ? layouts[selectedCategory].find((layout) => layout.id === selectedLayout)
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Seating Layout</h1>

      {!selectedCategory && !uploadedImage ? (
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {Object.keys(layouts).map((category) => (
            <button
              key={category}
              className="p-4 bg-white shadow-lg rounded-lg text-xl font-semibold hover:bg-gray-200"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
          <div className="p-4 bg-white shadow-lg rounded-lg text-xl font-semibold border-dashed border-2 border-gray-400 flex flex-col items-center">
            <h2 className="text-xl mb-2">Upload Your Own</h2>
            <input type="file" accept="image/*" onChange={handleUpload} className="mt-2 cursor-pointer" />
          </div>
        </div>
      ) : !selectedLayoutData && !uploadedImage ? (
        <div className="grid md:grid-cols-2 gap-6">
          {layouts[selectedCategory!].map((layout) => (
            <div
              key={layout.id}
              className="p-4 bg-white shadow-lg rounded-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-center mb-4">{layout.name}</h2>
              <Image
                src={layout.image}
                alt={layout.name}
                width={500}
                height={300}
                className="rounded-lg"
              />
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleSelect(layout.id)}
              >
                Select Layout
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {selectedLayoutData && (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedLayoutData.name}</h2>
              <Image
                src={selectedLayoutData.image}
                alt={selectedLayoutData.name}
                width={700}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </>
          )}
          {uploadedImage && (
            <>
              <h2 className="text-2xl font-bold mb-4">Custom Uploaded Layout</h2>
              <Image
                src={uploadedImage}
                alt="Uploaded Layout"
                width={700}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </>
          )}
          <button
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            onClick={handleReset}
          >
            Change Layout
          </button>
        </div>
      )}
    </div>
  );
}