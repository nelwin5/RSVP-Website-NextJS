// src/pages/api/publish-website/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Generate a unique subdomain
  const subdomain = `wedding-${id}`; // You can customize this or let user input it

  const updated = await prisma.weddingWebsite.update({
    where: { id: id as string },
    data: {
      published: true,
      subdomain,
    },
  });

  res.status(200).json(updated);
}
