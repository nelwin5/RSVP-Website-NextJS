"use client";

import { useParams } from "next/navigation"; // ✅ Get wedding website ID
import { useEffect, useState } from "react";
import Image from "next/image";

const layouts: Record<string, { id: number; name: string; image: string }[]> = {
  "50 Guests": [
    { id: 1, name: "50 Guests - Layout 1", image: "/images/layout1.png" },
    { id: 2, name: "50 Guests - Layout 2", image: "/images/layout1.png" },
  ],
  "80 Guests": [
    { id: 3, name: "80 Guests - Layout 1", image: "/images/layout1.png" },
    { id: 4, name: "80 Guests - Layout 2", image: "/images/layout1.png" },
  ],
  "100 Guests": [
    { id: 5, name: "100 Guests - Layout 1", image: "/images/layout1.png" },
    { id: 6, name: "100 Guests - Layout 2", image: "/images/layout1.png" },
  ],
};

export default function SeatingLayouts() {
  const { id: weddingWebsiteId } = useParams(); // ✅ Get wedding website ID
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // ✅ Fetch the saved seating layout on mount
  useEffect(() => {
    if (!weddingWebsiteId) return;

    fetch(`/api/wedding-websites/${weddingWebsiteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.seatingLayout && data.seatingLayout.url) {
          console.log("✅ Loaded Seating Layout:", data.seatingLayout);
          setUploadedImage(data.seatingLayout.url); // ✅ Use URL directly
        }
      })
      .catch((err) => console.error("❌ Failed to load seating layout:", err));
  }, [weddingWebsiteId]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedLayout(null);
    setUploadedImage(null);
  };

  // ✅ Save Selected Layout to Database
  const handleSelect = async (layoutId: number, layoutImage: string) => {
    setSelectedLayout(layoutId);
    setUploadedImage(layoutImage); // ✅ Display selected layout

    try {
      await fetch(`/api/wedding-websites/${weddingWebsiteId}`, {
        method: "PUT",
        body: JSON.stringify({ seatingLayout: { url: layoutImage } }), // ✅ Store as object
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Seating layout saved successfully!");
    } catch (error) {
      console.error("❌ Error saving seating layout:", error);
    }
  };

  // ✅ Handle Image Upload & Save to Database
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log("📤 Uploading image...");
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        console.log("✅ Uploaded Image URL:", data.url);
        setUploadedImage(data.url);
        setSelectedLayout(null);
        setSelectedCategory(null);

        // ✅ Save uploaded image URL to the database
        await fetch(`/api/wedding-websites/${weddingWebsiteId}`, {
          method: "PUT",
          body: JSON.stringify({ seatingLayout: { url: data.url } }), // ✅ Store as object
          headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Custom seating layout saved successfully!");
      } catch (error) {
        console.error("❌ Upload failed:", error);
      }
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedLayout(null);
    setUploadedImage(null);
  };

  const selectedLayoutData = selectedCategory
    ? layouts[selectedCategory].find((layout) => layout.id === selectedLayout)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Select a Seating Layout
      </h1>

      {/* If no selection is made, show category options */}
      {!selectedCategory && !uploadedImage ? (
        <div className="w-full max-w-3xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 text-center">
            {Object.keys(layouts).map((category) => (
              <button
                key={category}
                className="p-4 bg-white shadow-md rounded-lg text-lg font-semibold hover:bg-gray-100 transition w-full border border-gray-300"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="p-6 bg-white shadow-md rounded-lg border-dashed border-2 border-gray-400 flex flex-col items-center w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Upload Your Own
              </h2>
              <label className="cursor-pointer px-4 py-2 bg-[#ac263e] text-white rounded-lg hover:bg-[#911e34] transition">
                Choose File
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!selectedLayoutData && !uploadedImage && (
            <button
              className="mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              onClick={handleBack}
            >
              ← Back
            </button>
          )}

          {!selectedLayoutData && !uploadedImage ? (
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
              {layouts[selectedCategory!].map((layout) => (
                <div key={layout.id} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    {layout.name}
                  </h2>
                  <Image
                    src={layout.image}
                    alt={layout.name}
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                  <button
                    className="mt-4 w-full bg-[#ac263e] text-white py-2 rounded-lg hover:bg-[#911e34] transition font-semibold"
                    onClick={() => handleSelect(layout.id, layout.image)} // ✅ Pass layout image
                  >
                    Select Layout
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-3xl">
              {uploadedImage && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Seating Layout</h2>
                  <Image
                    src={uploadedImage}
                    alt="Seating Layout"
                    width={700}
                    height={500}
                    className="rounded-lg shadow-lg"
                  />
                </>
              )}

              <button
                className="mt-6 bg-[#ac263e] text-white py-2 px-6 rounded-lg hover:bg-[#ac263e] transition font-semibold"
                onClick={handleBack}
              >
                Change Layout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
