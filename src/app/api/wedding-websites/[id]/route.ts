import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// ✅ Handle GET request to fetch a wedding website
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Fetching wedding website with ID:", params.id); // Debugging

    const website = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
    });

    if (!website) {
      console.error("Wedding website not found:", params.id);
      return new Response(JSON.stringify({ error: "Wedding website not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(website), { status: 200 });
  } catch (error) {
    console.error("Error fetching wedding website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


// ✅ Handle Editing a Wedding Website
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { title } = await req.json();
    if (!title) return new Response(JSON.stringify({ error: "Missing title" }), { status: 400 });

    const updatedWebsite = await prisma.weddingWebsite.update({
      where: { id: params.id, plannerId: session.user.id },
      data: { title },
    });

    return new Response(JSON.stringify(updatedWebsite), { status: 200 });
  } catch (error) {
    console.error("Error updating website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// ✅ Handle Deleting a Wedding Website
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await prisma.weddingWebsite.delete({
      where: { id: params.id, plannerId: session.user.id },
    });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
