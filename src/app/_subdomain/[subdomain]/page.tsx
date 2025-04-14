import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function PublishedWeddingPage({ params }: { params: { subdomain: string } }) {
  const headersList = await headers(); // ✅ Await the headers
  const host = headersList.get("host"); // ✅ Now this works

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/subdomain/${params.subdomain}`);
  if (!res.ok) return notFound();

  const weddingData = await res.json();

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold">{weddingData.title}</h1>
      <p className="text-lg">{weddingData.coupleName}</p>
      <p className="text-md text-gray-600">{new Date(weddingData.eventDate).toLocaleDateString()}</p>
    </div>
  );
}
