import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/db";
import { getUserById } from "./backend/services/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,

  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        token.role
          ? (session.user.role = token.role)
          : (session.user.role = "user");
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role =
        existingUser.role === "admin" || existingUser.role === "user"
          ? existingUser.role
          : "user";

      return token;
    },
  },
});
