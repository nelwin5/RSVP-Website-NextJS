// src/pages/api/subdomain/[subdomain].ts
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subdomain } = req.query;

  const website = await prisma.weddingWebsite.findUnique({
    where: { subdomain: subdomain as string },
  });

  if (!website || !website.published) {
    return res.status(404).json({ message: "Website not found." });
  }

  res.status(200).json(website);
}
