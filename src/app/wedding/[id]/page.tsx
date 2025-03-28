"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/GalleryFinal";
import FloorPlan from "@/components/SeatingTemplate";
import GuestList from "@/components/GuestList";
import PublishControls from "@/components/PublishControls"; // ✅ Import PublishControls

interface WeddingWebsite {
  title: string;
  coupleName?: string;
  eventDate?: string;
  gallery?: string[];
  guestList?: { name: string; status: string }[];
}

export default function WeddingPage() {
  const { id } = useParams();
  const [weddingData, setWeddingData] = useState<WeddingWebsite | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid wedding website ID.");
      return;
    }
  
    fetch(`/api/wedding-websites/${id}`) // ✅ Fetch full website data (includes drafts)
      .then(async (res) => {
        if (!res.ok) {
          const errorMessage = await res.text();
          console.error(`❌ API Error (${res.status}):`, errorMessage);
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Received Website Data:", data);
  
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Website not found.");
        }
  
        // 🔥 Check if draftData exists and use it, otherwise fallback to main data
        const content = data.draftData ? JSON.parse(data.draftData) : data;
  
        setWeddingData(content);
      })
      .catch((err) => {
        console.error("❌ Fetch failed:", err);
        setError("Failed to load wedding website data.");
      });
  }, [id]);
  
  
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weddingData) return <p>Loading...</p>;

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Publish & Preview Controls */}
      <div className="container mx-auto px-6 py-4 flex justify-end">
        <PublishControls />
      </div>

      {/* Wedding Website Sections */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">{weddingData.title}</h1>
        {weddingData.coupleName && <p className="text-lg">{weddingData.coupleName}</p>}
        {weddingData.eventDate && (
          <p className="text-md">{new Date(weddingData.eventDate).toLocaleDateString()}</p>
        )}

        {/* ✅ Gallery Section */}
        <Gallery/>

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
