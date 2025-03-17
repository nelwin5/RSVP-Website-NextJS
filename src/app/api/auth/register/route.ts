import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<Response> {
  try {
    const { fullName, businessName, email, password, role } = await req.json();

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Validate role
    if (role !== "merchant" && role !== "planner") {
      return new Response(JSON.stringify({ error: "Invalid role selected" }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with role
    const newUser = await prisma.user.create({
      data: { 
        name: fullName, 
        businessName, 
        email, 
        password: hashedPassword, 
        role // ✅ Store role in database
      },
      select: { id: true, name: true, email: true, businessName: true, role: true }
    });

    await prisma.$disconnect();

    return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    await prisma.$disconnect();
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
