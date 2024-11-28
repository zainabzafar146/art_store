import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "@/lib/db";
import { compare } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("MISSING_CREDENTIALS");
          }
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
          if (!user) {
            throw new Error("USER_NOT_FOUND");
          }
          if (!user.password) {
            throw new Error("GOOGLE_ACCOUNT");
          }
          const passwordMatch = await compare(
            credentials.password as string,
            user.password,
          );
          if (!passwordMatch) {
            throw new Error("INVALID_PASSWORD");
          }
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      try {
        if (user) {
          token.role = user.role;
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | null;
      }
      return session;
    },
  },
});