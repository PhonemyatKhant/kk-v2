import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //   WHEN LOG IN

      async authorize(credentials) {
        // IF NO INPUT VALUES THROW ERROR
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // FIND USER FROM DB USING EMAIL THAT COMES FROM INPUT FIELD
        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // IF NO USER OR NO USER PASSWORD THROW ERROR
        if (!user || !user?.password) {
          throw new Error("Invalid credentials no user found");
        }

        // FINALLY COMPARE BOTH PASSWORDS

        const isCorrectPassword = credentials.password === user.password;

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials!");
        }

        return user;
      },
    }),
  ],

  //   ON DEVELOPMENT ENABLE DEBUG OPTIONS
  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
