import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { nanoid } from 'nanoid';

type Params = Promise<{ id: string }>;

// Handle POST request to publish a wedding website
export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    // Await params to get the ID properly
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const website = await prisma.weddingWebsite.findUnique({
      where: { id },
    });

    if (!website) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    if (website.published) {
      return NextResponse.json({ error: 'Already published' }, { status: 400 });
    }

    const subdomain = nanoid(8); // Generate a subdomain

    const updated = await prisma.weddingWebsite.update({
      where: { id },
      data: {
        published: true,
        subdomain,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error publishing wedding website:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
