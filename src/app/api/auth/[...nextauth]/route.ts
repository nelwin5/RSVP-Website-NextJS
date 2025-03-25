import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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

        // Disconnect Prisma (important to avoid memory leaks)
        await prisma.$disconnect();

        // Return user with role
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user.role as string).toLowerCase(); // Explicitly cast role as a string
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string; // Ensure session gets the correct role type
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect users to a custom login page if needed
    error: "/login?error=true", // Handle auth errors properly
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as SessionStrategy },
};

// NextAuth handler to support GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
