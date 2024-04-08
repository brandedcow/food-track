import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { prisma } from "./lib/db";

// Exported functions are for Server Components
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Must use JWT strat, Prisma ORM does not support Edge runtime. https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
  session: { strategy: "jwt" },
  secret: "M8YGjuFYzubtyV4v5uFaFEPlvgd7Ns2P8eEFozY/kms=",
});
