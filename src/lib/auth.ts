import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import {
  findUserByEmail,
  findUserById,
  createAccount,
  findAccount,
} from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // No adapter needed — we use JWT strategy and handle account linking manually
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await findUserByEmail(credentials.email as string);

        if (!user || !user.password) return null;

        const isValid = await compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth account linking
      if (account?.provider === "google" && user.email) {
        const existing = await findUserByEmail(user.email);
        if (existing) {
          // Link account to existing user
          const linked = await findAccount(
            account.provider,
            account.providerAccountId,
          );
          if (!linked) {
            const now = new Date().toISOString();
            await createAccount({
              userId: existing.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state ?? null,
              createdAt: now,
              updatedAt: now,
            });
          }
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await findUserByEmail(user.email!);
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
