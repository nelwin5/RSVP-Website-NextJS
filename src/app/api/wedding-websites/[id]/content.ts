import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth"; // ✅ Correct


const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { coupleName, eventDate, gallery, guestList, templates } = await req.json(); // ✅ Ensure templates is received

    console.log("📤 Updating Website Data:", { coupleName, eventDate, gallery, guestList, templates });

    const updatedWebsite = await prisma.weddingWebsite.update({
      where: { id: params.id, plannerId: session.user.id },
      data: {
        coupleName,
        eventDate,
        gallery,
        guestList,
        templates, // ✅ Store templates in DB
      },
    });

    console.log("✅ Website updated successfully!", updatedWebsite);
    return new Response(JSON.stringify(updatedWebsite), { status: 200 });
  } catch (error) {
    console.error("❌ Error updating content:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const website = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
    });

    if (!website) {
      return new Response(JSON.stringify({ error: "Wedding website not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(website), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
