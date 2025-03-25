import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ GET: Fetch guests for a specific wedding website
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Fetching guests for wedding website ID:", params.id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true }, // ✅ Fetch only guest list
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    // ✅ Ensure guestList is always an array before returning
    return NextResponse.json(Array.isArray(wedding.guestList) ? wedding.guestList : []);
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ POST: Add a new guest
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, contact, status, address } = await req.json();

    if (!name || !contact || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Adding new guest to wedding:", params.id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    // ✅ Ensure guestList is always an array before updating
    const existingGuestList = Array.isArray(wedding.guestList) ? wedding.guestList : [];
    const updatedGuestList = [...existingGuestList, { id: Date.now(), name, contact, status, address }];

    await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { guestList: updatedGuestList },
    });

    return NextResponse.json({ message: "Guest added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ PUT: Edit an existing guest
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id, name, contact, status, address } = await req.json();

    console.log("Editing guest in wedding:", params.id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList = Array.isArray(wedding.guestList) ? wedding.guestList : [];
    const updatedGuestList = existingGuestList.map((guest: any) =>
      guest.id && guest.id === id ? { ...guest, name, contact, status, address } : guest
    );

    await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { guestList: updatedGuestList },
    });

    return NextResponse.json({ message: "Guest updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE: Remove a guest from the list
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { guestId } = await req.json();

    console.log("Deleting guest from wedding:", params.id, "Guest ID:", guestId);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList = Array.isArray(wedding.guestList) ? wedding.guestList : [];
    const updatedGuestList = existingGuestList.filter((guest: any) => guest.id !== guestId);

    await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { guestList: updatedGuestList },
    });

    return NextResponse.json({ message: "Guest deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
