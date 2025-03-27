import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Validate password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // Disconnect Prisma to avoid memory leaks
        await prisma.$disconnect();

        // Return user with role
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string; // Explicitly cast to string
        token.role = String(user.role).toLowerCase(); // Ensure it's always a string
      }
      return token as JWT; // Ensure token matches the expected type
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Ensure id is a string
        session.user.role = token.role as string; // Ensure role is a string
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
