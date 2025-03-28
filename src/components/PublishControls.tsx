"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PublishControls() {
  const { id: weddingWebsiteId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [publishedURL, setPublishedURL] = useState("#");
  const [isPublished, setIsPublished] = useState(false);

  const draftURL = weddingWebsiteId ? `/wedding/edit/${weddingWebsiteId}` : "#";

  // ✅ Fetch the latest published URL
  useEffect(() => {
    if (!weddingWebsiteId) return;

    const fetchWebsiteData = async () => {
      try {
        const res = await fetch(`/api/wedding-websites/${weddingWebsiteId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        // ✅ Use custom domain or subdomain if available
        if (data.customDomain) {
          setPublishedURL(`https://${data.customDomain}`);
        } else if (data.subdomain) {
          setPublishedURL(`https://${data.subdomain}.yourplatform.com`);
        } else {
          setPublishedURL(`/wedding/${weddingWebsiteId}`);
        }

        setIsPublished(data.isPublished);
      } catch (error) {
        console.error("❌ Error fetching published website:", error);
      }
    };

    fetchWebsiteData();
  }, [weddingWebsiteId]);

  // ✅ Save Draft
  const handleSaveDraft = async () => {
    if (!weddingWebsiteId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/wedding-websites/${weddingWebsiteId}/preview`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: false }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("✅ Draft saved successfully!");
      setIsPublished(false);
    } catch (error) {
      console.error("❌ Error saving draft:", error);
      alert("Error saving draft!");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Publish Website
  const handlePublish = async () => {
    if (!weddingWebsiteId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/wedding-websites/${weddingWebsiteId}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("🎉 Website published successfully!");

      // ✅ Update the published URL dynamically
      if (data.publishedUrl) {
        setPublishedURL(data.publishedUrl);
      } else {
        setPublishedURL(`/wedding/${weddingWebsiteId}`);
      }

      setIsPublished(true);
    } catch (error) {
      console.error("❌ Error publishing website:", error);
      alert("Error publishing website!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-end gap-4">
        {/* Save Draft Button */}
        <button
          onClick={handleSaveDraft}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Draft"}
        </button>

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg shadow-md transition disabled:opacity-50 ${
            isPublished ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isLoading ? "Publishing..." : isPublished ? "Published" : "Publish"}
        </button>
      </div>

      {/* Links Section */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">📌 Website Links</h3>

        {/* Draft Link */}
        <div className="mb-2">
          <span className="font-medium">Draft Preview: </span>
          <a href={draftURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {draftURL}
          </a>
        </div>

        {/* Published Link */}
        <div>
          <span className="font-medium">Published Website: </span>
          <a href={publishedURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {publishedURL}
          </a>
        </div>
      </div>
    </div>
  );
}
