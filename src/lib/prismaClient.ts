import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export enum Role {
  MERCHANT = "MERCHANT",
  PLANNER = "PLANNER",
}
