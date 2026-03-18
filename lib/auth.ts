import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcrypt";
import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";




export const authOptions:NextAuthOptions = {
  adapter:PrismaAdapter(db),
  // pages:{
  //   signIn:"/login",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log(credentials);
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = user.role;
  //       token.id = user.id;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },


  secret: process.env.NEXTAUTH_SECRET,
};