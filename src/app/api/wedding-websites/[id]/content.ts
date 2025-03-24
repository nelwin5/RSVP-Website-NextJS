import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { coupleName, eventDate, gallery, guestList } = await req.json();

    const updatedWebsite = await prisma.weddingWebsite.update({
      where: { id: params.id, plannerId: session.user.id },
      data: { coupleName, eventDate, gallery, guestList },
    });

    return new Response(JSON.stringify(updatedWebsite), { status: 200 });
  } catch (error) {
    console.error("Error updating content:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
