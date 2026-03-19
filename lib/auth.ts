import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // ✅ IMPORTANT: Force HS256 (no encryption → Hasura compatible)
  jwt: {
    async encode({ token, secret }) {
      if (!token) return "";

      return jwt.sign(token, secret as string, {
        algorithm: "HS256",
      });
    },

    async decode({ token, secret }) {
      if (!token) return null;

      return jwt.verify(token, secret as string) as any;
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      // ✅ Hasura REQUIRED claims format
      token["https://hasura.io/jwt/claims"] = {
        "x-hasura-default-role": token.role,
        "x-hasura-allowed-roles": ["Intern", "Manager", "HR", "Admin"],
        "x-hasura-user-id": token.id,
        "x-hasura-email": token.email,
        "x-hasura-role": token.role,
      };

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
      };

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};