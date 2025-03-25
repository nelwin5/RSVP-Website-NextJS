/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import VendorCards from "@/components/VendorCard";

export default function MerchantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // ✅ Redirect unauthenticated users & non-merchants
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
    if (status === "authenticated" && session?.user?.role?.toLowerCase() !== "merchant") {
      router.replace("/");
    }
  }, [session, status, router]);
  
  // ✅ Show a Better Loading State
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Merchant Section */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Merchant Dashboard</h1>

        {/* ✅ Vendor Cards */}
        <VendorCards />

        {/* ✅ Contact Form */}
        <ContactForm />
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
