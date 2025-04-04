import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface Guest {
  id: number;
  name: string;
  contact: string;
  status: string;
  address: string;
}

// Define the params type for Next.js 15
type Params = Promise<{ id: string }>;

// GET: Fetch guests for a specific wedding website
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    console.log("Fetching guests for wedding website ID:", id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    return NextResponse.json(Array.isArray(wedding.guestList) ? wedding.guestList : []);
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: Add a new guest
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const { name, contact, status, address } = await request.json();

    if (!name || !contact || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Adding new guest to wedding:", id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList = Array.isArray(wedding.guestList) ? wedding.guestList : [];
    const updatedGuestList = [...existingGuestList, { id: Date.now(), name, contact, status, address }];

    await prisma.weddingWebsite.update({
      where: { id },
      data: { guestList: updatedGuestList as unknown as Prisma.JsonArray },
    });

    return NextResponse.json({ message: "Guest added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT: Edit an existing guest
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const { id: guestId, name, contact, status, address } = await request.json();

    console.log("Editing guest in wedding:", id);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList = Array.isArray(wedding.guestList) 
      ? (wedding.guestList as unknown as Guest[]) 
      : [];

    const updatedGuestList = existingGuestList
      .filter((guest: Guest | null): guest is Guest => guest !== null)
      .map((guest: Guest) =>
        guest.id === guestId ? { ...guest, name, contact, status, address } : guest
      );

    await prisma.weddingWebsite.update({
      where: { id },
      data: { guestList: updatedGuestList as unknown as Prisma.JsonArray },
    });

    return NextResponse.json({ message: "Guest updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: Remove a guest from the list
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const { guestId } = await request.json();

    console.log("Deleting guest from wedding:", id, "Guest ID:", guestId);

    const wedding = await prisma.weddingWebsite.findUnique({
      where: { id },
      select: { guestList: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding website not found" }, { status: 404 });
    }

    const existingGuestList = Array.isArray(wedding.guestList) 
      ? (wedding.guestList as unknown as Guest[]) 
      : [];

    const updatedGuestList = existingGuestList
      .filter((guest: Guest | null): guest is Guest => guest !== null)
      .filter((guest: Guest) => guest.id !== guestId);

    await prisma.weddingWebsite.update({
      where: { id },
      data: { guestList: updatedGuestList as unknown as Prisma.JsonArray },
    });

    return NextResponse.json({ message: "Guest deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
