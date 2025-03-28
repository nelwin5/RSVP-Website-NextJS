import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const wedding = await prisma.weddingWebsite.update({
      where: { id },
      data: { isPublished: true, publishedAt: new Date() }, // ✅ Set publish mode
    });

    return NextResponse.json({ message: "Website published successfully", wedding }, { status: 200 });
  } catch (error) {
    console.error("❌ Error publishing website:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
