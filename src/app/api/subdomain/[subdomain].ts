import { prisma } from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subdomain } = req.query;

  if (!subdomain || typeof subdomain !== "string") {
    return res.status(400).json({ error: "Missing subdomain" });
  }

  try {
    const website = await prisma.weddingWebsite.findUnique({
      where: { subdomain },
    });

    if (!website || !website.published) {
      return res.status(404).json({ error: "Wedding website not found" });
    }

    res.status(200).json(website);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
