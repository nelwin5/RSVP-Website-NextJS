import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { draftData } = await req.json();

    if (!params.id) {
      console.error("❌ Missing ID parameter in API call");
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    if (!draftData) {
      console.error("❌ Missing draftData in request");
      return NextResponse.json({ error: "Missing draftData" }, { status: 400 });
    }

    console.log("📥 Saving Draft for:", params.id, "Data:", draftData);

    // ✅ Ensure Prisma correctly updates JSON field
    const updatedWebsite = await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { draftData: JSON.stringify(draftData) }, // 🔥 Ensure JSON is saved properly
    });

    console.log("✅ Draft saved successfully!", updatedWebsite);

    return NextResponse.json({ message: "Draft saved successfully", data: updatedWebsite }, { status: 200 });
  } catch (error) {
    console.error("❌ Error saving draft:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
