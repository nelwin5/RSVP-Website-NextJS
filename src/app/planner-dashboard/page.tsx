"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar"; // ✅ Import Navbar
import TemplateCards from "@/components/TemplateCards"; // ✅ Import Template Cards
import ContactForm from "@/components/ContactForm"; // ✅ Import Contact Form
import Footer from "@/components/Footer"; // ✅ Import Footer

export default function PlannerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not a planner
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "planner") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Planner Section */}
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Planner</h1>

        {/* ✅ Template Selection Cards */}
        <TemplateCards />
      </section>

      {/* ✅ Contact Form */}
      <ContactForm />

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
