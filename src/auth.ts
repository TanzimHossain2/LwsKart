import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,
});
