"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WeddingWebsite {
  id: string;
  title: string;
  theme: string;
}

export default function PlannerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("default");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [weddingWebsites, setWeddingWebsites] = useState<WeddingWebsite[]>([]);
  const [editingWebsite, setEditingWebsite] = useState<WeddingWebsite | null>(null); // ✅ Track which website is being edited

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/login");
    if (status === "authenticated" && session?.user?.role?.toLowerCase() !== "planner") router.replace("/");
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/wedding-websites")
        .then((res) => res.json())
        .then((data) => setWeddingWebsites(data.websites))
        .catch((err) => console.error("Failed to fetch websites:", err));
    }
  }, [status]);

  // ✅ Handle Wedding Website Creation
  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/wedding-websites", {
      method: "POST",
      body: JSON.stringify({ title, theme }),
      headers: { "Content-Type": "application/json" },
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      setError("Server returned an invalid response.");
      return;
    }

    if (!res.ok) {
      setError(data.error || "Failed to create wedding website.");
      return;
    }

    setSuccess("Wedding website created successfully!");
    setTitle("");

    // ✅ Refresh list after creating a new website
    fetch("/api/wedding-websites")
      .then((res) => res.json())
      .then((data) => setWeddingWebsites(data.websites))
      .catch((err) => console.error("Failed to fetch websites:", err));
  };

  // ✅ Handle Editing a Wedding Website
  const handleEditWebsite = async (id: string) => {
    const newTitle = prompt("Enter new title:", editingWebsite?.title || "");
    if (!newTitle) return;

    const res = await fetch(`/api/wedding-websites/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      alert("Failed to update website.");
      return;
    }

    setWeddingWebsites((prev) =>
      prev.map((site) => (site.id === id ? { ...site, title: newTitle } : site))
    );
    setEditingWebsite(null);
  };

  // ✅ Handle Deleting a Wedding Website
  const handleDeleteWebsite = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wedding website?")) return;

    const res = await fetch(`/api/wedding-websites/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete website.");
      return;
    }

    setWeddingWebsites((prev) => prev.filter((site) => site.id !== id));
  };

  return (
    <div className="bg-white">
      <Navbar />

      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Planner Dashboard</h1>

        {/* ✅ Wedding Website Creation Form */}
        <form onSubmit={handleCreateWebsite} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Create a Wedding Website</h2>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <input
            type="text"
            placeholder="Website Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white mb-4"
            required
          />

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white mb-4"
            required
          >
            <option value="default">Default Theme</option>
            <option value="elegant">Elegant Theme</option>
            <option value="modern">Modern Theme</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Create Website
          </button>
        </form>

        {/* ✅ Display Created Wedding Websites */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Your Wedding Websites</h2>
        <ul>
          {weddingWebsites.map((site) => (
            <li key={site.id} className="border p-4 rounded-md mb-2 bg-gray-50 flex justify-between">
              <div>
                <p className="font-semibold">{site.title}</p>
                <p className="text-sm text-gray-600">Theme: {site.theme}</p>
              </div>
              <div className="space-x-2">
                <Link href={`/wedding/${site.id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md">View Website</button>
                </Link>
                <button onClick={() => handleEditWebsite(site.id)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
                  Edit
                </button>
                <button onClick={() => handleDeleteWebsite(site.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </section>

      <Footer />
    </div>
  );
}
