import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export async function isAuthenticated() {
  const user = await getSessionUser();
  return user !== null;
}

export async function getUserRole() {
  const user = await getSessionUser();
  return user?.role || "guest";
}
