import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/GalleryFinal";
import FloorPlan from "@/components/SeatingTemplate";
import GuestList from "@/components/GuestList";
import QRCode from "react-qr-code";

async function getWeddingWebsite(subdomain: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subdomain/${subdomain}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function SubdomainPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const wedding = await getWeddingWebsite(params.subdomain);

  if (!wedding || !wedding.published) return notFound();

  return (
    <div className="bg-white">
      <Navbar />
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">{wedding.title}</h1>
        {wedding.coupleName && <p className="text-lg">{wedding.coupleName}</p>}
        {wedding.eventDate && (
          <p className="text-md">{new Date(wedding.eventDate).toLocaleDateString()}</p>
        )}
        <Gallery />
        <FloorPlan />
        <GuestList />

        <div className="mt-4">
          <p className="text-xl">Your wedding website is published!</p>
          <p className="text-md text-gray-600">
            {params.subdomain}.weddingofcarlanne.com
          </p>
          <QRCode value={`https://${params.subdomain}.weddingofcarlanne.com`} />
        </div>
      </section>
    </div>
  );
}
