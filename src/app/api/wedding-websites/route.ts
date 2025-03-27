import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth"; // ✅ Correct


const prisma = new PrismaClient();

export async function GET(req: Request) { // ✅ Add GET method
  try {
    const session = await getServerSession(authOptions);
    console.log("Session Data:", session); // ✅ Debugging

    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized", websites: [] }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Fetch wedding websites for the logged-in planner
    const websites = await prisma.weddingWebsite.findMany({
      where: { plannerId: session.user.id },
    });

    return new Response(JSON.stringify({ websites }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching wedding websites:", error);
    return new Response(JSON.stringify({ error: "Server error", websites: [] }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) { // ✅ Keep the existing POST method
  try {
    const session = await getServerSession(authOptions);
    console.log("Session Data:", session); // ✅ Debugging

    if (!session || session.user.role !== "planner") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Ensure session contains user ID
    if (!session.user.id) {
      console.error("Error: Missing user ID in session");
      return new Response(JSON.stringify({ error: "Session error: Missing user ID" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Handle JSON parsing errors
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { title, theme } = body;
    if (!title || !theme) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Create the wedding website in Prisma
    const weddingWebsite = await prisma.weddingWebsite.create({
      data: {
        plannerId: session.user.id,
        title,
        theme,
      },
    });

    return new Response(JSON.stringify(weddingWebsite), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating wedding website:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
