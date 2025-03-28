import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Guest {
  id: string;
  name: string;
  contact: string;
  status: string;
  address: string;
}

// ✅ GET: Fetch guests for a specific wedding website
export async function GET(req: Request, { params }: { params?: { id?: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    console.log("Fetching wedding website with ID:", params.id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    // ✅ Ensure guestList is always an array before returning
    const guestList: Guest[] = Array.isArray(wedding.guestList)
      ? (wedding.guestList as unknown as Guest[]).filter((guest) => guest && typeof guest === "object" && "id" in guest)
      : [];

    return NextResponse.json(guestList);
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
    const existingGuestList: Guest[] = Array.isArray(wedding.guestList)
      ? (wedding.guestList as unknown as Guest[]).filter((guest) => guest && typeof guest === "object" && "id" in guest)
      : [];

    // ✅ Create a new guest object
    const newGuest: Guest = {
      id: Date.now().toString(), // ✅ Convert to string
      name,
      contact,
      status,
      address,
    };

    // ✅ Append the new guest to the existing list
    const updatedGuestList: Guest[] = [...existingGuestList, newGuest];

    // ✅ Save the updated guest list in the database
    await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { guestList: updatedGuestList as unknown as object }, // ✅ Ensure Prisma accepts it
    });

    return NextResponse.json({ message: "Guest added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// ✅ DELETE: Remove a guest from the list
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const guestId = new URL(req.url).searchParams.get("guestId");

    if (!guestId) {
      return NextResponse.json({ error: "Guest ID is required" }, { status: 400 });
    }

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id: params.id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList: Guest[] = Array.isArray(wedding.guestList)
      ? (wedding.guestList as unknown as Guest[]).filter((guest) => guest && typeof guest === "object" && "id" in guest)
      : [];

    const updatedGuestList = existingGuestList.filter((guest) => guest.id !== guestId);

    if (existingGuestList.length === updatedGuestList.length) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    await prisma.weddingWebsite.update({
      where: { id: params.id },
      data: { guestList: updatedGuestList as unknown as object }, // ✅ Ensure Prisma accepts it
    });

    return NextResponse.json({ message: "Guest deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
