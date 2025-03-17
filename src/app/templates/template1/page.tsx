"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery"; // ✅ Import Gallery1
import FloorPlan from "@/components/FloorPlan1";
import GuestList from "@/components/GuestList";

export default function Template1Page() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Upload Photos Section */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Gallery Section</h1>

        {/* ✅ Gallery1 Component */}
        <Gallery />
        <FloorPlan/>
        <GuestList/>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
