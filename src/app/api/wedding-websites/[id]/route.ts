import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth"; // ✅ Correct


const prisma = new PrismaClient();

// ✅ Handle GET request to fetch a wedding website
export async function GET(req: Request, context: { params?: { id?: string } }) {
  try {
    if (!context.params?.id) {
      return new Response(JSON.stringify({ error: "Missing ID parameter" }), { status: 400 });
    }

    const { id } = context.params;
    console.log("Fetching wedding website with ID:", id);

    const website = await prisma.weddingWebsite.findUnique({
      where: { id },
      select: {
        id: true,
        plannerId: true,
        title: true,
        theme: true,
        createdAt: true,
        eventDate: true,
        coupleName: true,
        gallery: true,
        templates: true,
        guestList: true,
        seatingLayout: true,
      },
    });

    if (!website) {
      return new Response(JSON.stringify({ error: "Wedding website not found" }), { status: 404 });
    }

    // ✅ Parse `seatingLayout` JSON before sending response
    return new Response(
      JSON.stringify({
        ...website,
        seatingLayout: website.seatingLayout ? JSON.parse(website.seatingLayout as string) : null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching wedding website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


// ✅ Handle Updating a Wedding Website
// ✅ Handle Updating a Wedding Website
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id } = context.params;
    const { title, gallery, templates, seatingLayout } = await req.json();

    console.log("📤 Updating Wedding Website:", { id, title, gallery, templates, seatingLayout });

    const updatedWebsite = await prisma.weddingWebsite.update({
      where: { id, plannerId: session.user.id },
      data: {
        ...(title && { title }),
        ...(gallery && { gallery }),
        ...(templates && { templates }),
        ...(seatingLayout && { seatingLayout: typeof seatingLayout === "string" ? seatingLayout : JSON.stringify(seatingLayout) }), // ✅ Only stringify if not a string
      },
    });

    console.log("✅ Wedding website updated successfully:", updatedWebsite);
    return new Response(JSON.stringify(updatedWebsite), { status: 200 });
  } catch (error) {
    console.error("❌ Error updating website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


// ✅ Handle Deleting a Wedding Website
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await prisma.weddingWebsite.delete({
      where: { id: context.params.id, plannerId: session.user.id }, // ✅ Correct `context.params.id`
    });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
