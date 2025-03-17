"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar"; // ✅ Import Navbar
import ContactForm from "@/components/ContactForm"; // ✅ Import Contact Form
import Footer from "@/components/Footer"; // ✅ Import Footer
import VendorCards from "@/components/VendorCard";

export default function MerchantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not a merchant
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "merchant") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Merchant Section */}
      <section className="container mx-auto px-6 py-12">

        <VendorCards />
        {/* ✅ Vendor Cards */}
      

      {/* ✅ Contact Form */}
      <ContactForm />
      </section>
      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
