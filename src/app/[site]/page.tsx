// /app/[site]/page.tsx

import { notFound } from "next/navigation";

interface WeddingWebsite {
  title: string;
  coupleName?: string;
  eventDate?: string;
  gallery?: string[];
  guestList?: { name: string; status: string }[];
}

export default async function PublishedWeddingPage({ params }: { params: { site: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subdomain/${params.site}`);
  if (!res.ok) return notFound();

  const weddingData: WeddingWebsite = await res.json();

  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-6">{weddingData.title}</h1>
      <p className="text-center">{weddingData.coupleName}</p>
      <p className="text-center">{weddingData.eventDate}</p>
      {/* Reuse your components if possible */}
    </div>
  );
}
