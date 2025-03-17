import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  // Redirect to login if user is not authenticated
  if (!session) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
        <p>This is your dashboard. You are logged in.</p>
      </main>
    </div>
  );
}
