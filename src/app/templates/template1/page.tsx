"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/GalleryFinal";
import FloorPlan from "@/components/SeatingTemplate";
import GuestList from "@/components/GuestList";

export default function WeddingPage() {
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error("Invalid wedding website ID.");
    }
  }, [id]);

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Wedding Website Sections */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Wedding Website</h1>

        {/* ✅ Gallery Section */}
        <Gallery />

        {/* ✅ Floor Plan Section */}
        <FloorPlan />

        {/* ✅ Guest List Section */}
        <GuestList />
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
