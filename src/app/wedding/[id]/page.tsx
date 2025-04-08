"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Updated to useParams
import Navbar from "@/components/Navbar";
import Gallery from "@/components/GalleryFinal";
import FloorPlan from "@/components/SeatingTemplate";
import GuestList from "@/components/GuestList";
import QRCode from "react-qr-code"; // Ensure you have the package installed

interface WeddingWebsite {
  title: string;
  coupleName?: string;
  eventDate?: string;
  gallery?: string[];
  guestList?: { name: string; status: string }[];
  published?: boolean;
  subdomain?: string;
}

export default function WeddingPage() {
  const { id } = useParams(); // Use useParams to get dynamic route parameters
  const [weddingData, setWeddingData] = useState<WeddingWebsite | null>(null);
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Invalid wedding website ID.");
      return;
    }

    fetch(`/api/wedding-websites/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Error ${res.status}: ${errorMessage}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Wedding website not found.");
        }
        setWeddingData(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("Failed to load wedding website:", err.message);
          setError("Failed to load wedding website data.");
        } else {
          console.error("An unknown error occurred", err);
          setError("An unknown error occurred.");
        }
      });
  }, [id]);

  const handlePublish = async () => {
    if (!weddingData) return;

    setIsPublishing(true);

    try {
      // Call your backend to publish the website and generate the subdomain
      const response = await fetch(`/api/publish-website/${id}`, {
        method: 'POST',
      });
      

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to publish website. Error: ${errorMessage}`);
      }

      const updatedWebsite = await response.json();
      setWeddingData(updatedWebsite);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Failed to publish website:", err.message);
        setError(`Failed to publish wedding website: ${err.message}`);
      } else {
        console.error("An unknown error occurred", err);
        setError("An unknown error occurred.");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weddingData) return <p>Loading...</p>;

  return (
    <div className="bg-white">
      <Navbar />

      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">{weddingData.title}</h1>
        {weddingData.coupleName && <p className="text-lg">{weddingData.coupleName}</p>}
        {weddingData.eventDate && (
          <p className="text-md">{new Date(weddingData.eventDate).toLocaleDateString()}</p>
        )}

        <Gallery />
        <FloorPlan />
        <GuestList />

        {/* Publish Button */}
        {!weddingData.published && (
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            {isPublishing ? "Publishing..." : "Publish Website"}
          </button>
        )}

        {/* Display QR Code if Published */}
        {weddingData.published && weddingData.subdomain && (
  <div className="mt-4">
    <p className="text-xl">Your wedding website is published!</p>
    <p className="text-md text-gray-600">
      You can access it at: {weddingData.subdomain}.vercel.app
    </p>
    <QRCode value={`https://${weddingData.subdomain}.vercel.app`} />
  </div>
)}

      </section>
    </div>
  );
}
