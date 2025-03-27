"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Get weddingWebsiteId from URL
import GalleryTemplate1 from "@/components/GalleryTemplate1";
import GalleryTemplate2 from "@/components/GalleryTemplate2";
import GalleryTemplate3 from "@/components/GalleryTemplate3";

const TOTAL_PAGES = 10;

type PageState = {
  template: number | null;
  images: string[];
};

const GallerySelector = () => {
  const { id: weddingWebsiteId } = useParams(); // ✅ Get wedding website ID
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<PageState[]>(() =>
    Array.from({ length: TOTAL_PAGES }, () => ({ template: null, images: Array(10).fill("") }))
  );
  const [viewMode, setViewMode] = useState<"single" | "all">("single");

  // ✅ Fetch saved gallery data and templates on mount
  useEffect(() => {
    if (!weddingWebsiteId) return;
  
    fetch(`/api/wedding-websites/${weddingWebsiteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.gallery && data.templates) {
          setPages(
            Array.from({ length: TOTAL_PAGES }, (_, index) => ({
              template: data.templates[index] ?? null, // ✅ Prevent undefined values
              images: data.gallery[index] ?? Array(10).fill(""),
            }))
          );
        }
      })
      .catch((err) => console.error("Failed to load saved gallery:", err));
  }, [weddingWebsiteId]); // ✅ Fetch once on mount
  
  

  // ✅ Handle Template Selection & Save to Database
  const handleTemplateSelect = async (template: number) => {
    const updatedPages = pages.map((page, index) =>
      index === currentPage ? { ...page, template } : page
    );

    setPages(updatedPages);

    // ✅ Save updated templates to the database
    await fetch(`/api/wedding-websites/${weddingWebsiteId}`, {
      method: "PUT",
      body: JSON.stringify({ templates: updatedPages.map((p) => p.template) }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Template updated in the database!");
  };

  // ✅ Handle Image Upload & Save to Database
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
        const imageUrl = data.url;

        const updatedPages = pages.map((page, pageIndex) =>
          pageIndex === currentPage
            ? { ...page, images: page.images.map((img, imgIndex) => (imgIndex === index ? imageUrl : img)) }
            : page
        );

        setPages(updatedPages);

        // ✅ Save updated gallery to the database
        await fetch(`/api/wedding-websites/${weddingWebsiteId}`, {
          method: "PUT",
          body: JSON.stringify({ gallery: updatedPages.map((p) => p.images) }),
          headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Gallery updated in the database!");
      } catch (error) {
        console.error("❌ Upload failed:", error);
      }
    }
  };

  const renderGalleryWithUpload = () => {
    const selectedTemplate = pages[currentPage].template;
    const images = pages[currentPage].images;

    if (selectedTemplate === 1) return <GalleryTemplate1 images={images} onImageUpload={handleImageUpload} />;
    if (selectedTemplate === 2) return <GalleryTemplate2 images={images} onImageUpload={handleImageUpload} />;
    if (selectedTemplate === 3) return <GalleryTemplate3 images={images} onImageUpload={handleImageUpload} />;
    return <p className="text-center text-gray-500">Please select a template</p>;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-gray-800 font-semibold mb-4 text-center">
        {viewMode === "single" ? `Page ${currentPage + 1}` : "All Pages"}
      </h2>

      {viewMode === "single" && (
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 text-sm bg-gray-600 rounded-lg disabled:opacity-50"
            disabled={currentPage === 0}
          >
            ◀ Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1))}
            className="px-4 py-2 text-sm bg-gray-600 rounded-lg disabled:opacity-50"
            disabled={currentPage === TOTAL_PAGES - 1}
          >
            Next ▶
          </button>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm border rounded-xl transition-all ${
            viewMode === "single" ? "bg-[#ac263e] text-white" : "bg-white"
          }`}
          onClick={() => setViewMode("single")}
        >
          Single Page View
        </button>
        <button
          className={`px-4 py-2 text-sm border rounded-xl transition-all ${
            viewMode === "all" ? "bg-[#ac263e] text-white" : "text-gray-600 bg-white"
          }`}
          onClick={() => setViewMode("all")}
        >
          All Pages View
        </button>
      </div>

      {viewMode === "single" && (
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`px-4 py-2 text-sm border rounded-xl transition-all ${
                pages[currentPage].template === num ? "bg-[#ac263e] text-white" : "text-gray-600 bg-white"
              }`}
              onClick={() => handleTemplateSelect(num)}
            >
              Template {num}
            </button>
          ))}
        </div>
      )}

      {viewMode === "all" ? (
        <div className="space-y-8">
          {pages.map((page, index) => (
            <div key={index} className="bg-white">
              {page.template === 1 && <GalleryTemplate1 images={page.images} onImageUpload={handleImageUpload} />}
              {page.template === 2 && <GalleryTemplate2 images={page.images} onImageUpload={handleImageUpload} />}
              {page.template === 3 && <GalleryTemplate3 images={page.images} onImageUpload={handleImageUpload} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white">{renderGalleryWithUpload()}</div>
      )}
    </div>
  );
};

export default GallerySelector;
