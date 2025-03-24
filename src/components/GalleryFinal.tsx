"use client";

import React, { useState } from "react";
import GalleryTemplate1 from "@/components/GalleryTemplate1";
import GalleryTemplate2 from "@/components/GalleryTemplate2";
import GalleryTemplate3 from "@/components/GalleryTemplate3";

const TOTAL_PAGES = 10;

type PageState = {
  template: number | null;
  images: string[];
};

const GallerySelector = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<PageState[]>(() =>
    Array.from({ length: TOTAL_PAGES }, () => ({ template: null, images: Array(10).fill("") }))
  );
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single'); // Track the current view mode

  const handleTemplateSelect = (template: number) => {
    setPages((prevPages) => {
      const newPages = prevPages.map((page, index) =>
        index === currentPage ? { ...page, template } : page
      );
      return newPages;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setPages((prevPages) => {
        const newPages = prevPages.map((page, pageIndex) =>
          pageIndex === currentPage
            ? { ...page, images: page.images.map((img, imgIndex) => (imgIndex === index ? imageUrl : img)) }
            : page
        );
        return newPages;
      });
    }
  };

  const renderGalleryWithUpload = () => {
    const selectedTemplate = pages[currentPage].template;
    const images = pages[currentPage].images;

    if (selectedTemplate === 1)
      return <GalleryTemplate1 images={images} onImageUpload={handleImageUpload} />;
    if (selectedTemplate === 2)
      return <GalleryTemplate2 images={images} onImageUpload={handleImageUpload} />;
    if (selectedTemplate === 3)
      return <GalleryTemplate3 images={images} onImageUpload={handleImageUpload} />;
    return <p className="text-center text-gray-500">Please select a template</p>;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {viewMode === 'single' ? `Page ${currentPage + 1}` : 'All Pages'}
      </h2>

      {/* Next/Previous Buttons on Top */}
      {viewMode === 'single' && (
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 text-sm bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === 0}
          >
            ◀ Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1))}
            className="px-4 py-2 text-sm bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === TOTAL_PAGES - 1}
          >
            Next ▶
          </button>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm border rounded-xl transition-all ${viewMode === 'single' ? "bg-[#ac263e] text-white" : "bg-white"}`}
          onClick={() => setViewMode('single')}
        >
          Single Page View
        </button>
        <button
          className={`px-4 py-2 text-sm border rounded-xl transition-all ${viewMode === 'all' ? "bg-[#ac263e] text-white" : "bg-white"}`}
          onClick={() => setViewMode('all')}
        >
          All Pages View
        </button>
      </div>

      {/* Template selection (for current page) */}
      {viewMode === 'single' && (
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`px-4 py-2 text-sm border rounded-xl transition-all ${
                pages[currentPage].template === num ? "bg-[#ac263e] text-white" : "bg-white"
              }`}
              onClick={() => handleTemplateSelect(num)}
            >
              Template {num}
            </button>
          ))}
        </div>
      )}

      {/* All Pages View */}
      {viewMode === 'all' ? (
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
        <div className="bg-white">
          {renderGalleryWithUpload()}
        </div>
      )}

      {/* Pagination Controls */}
      {viewMode === 'single' && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 text-sm bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === 0}
          >
            ◀ Previous
          </button>
          <div className="text-gray-600 text-sm">
            Page {currentPage + 1} / {TOTAL_PAGES}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1))}
            className="px-4 py-2 text-sm bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === TOTAL_PAGES - 1}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default GallerySelector;
