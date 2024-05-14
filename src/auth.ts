import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import clientPromise from "./lib/db";
import userModel from "./backend/schema/userModel";

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            profile(profile){
                return {
                    name: profile.name,
                    username: profile.username ?? profile.email.split("@")[0],
                    email: profile.email,
                    image: profile.image ?? "/images/avatar.png",
                    role: profile.role ?? "user",
                    emailVerified: profile.email_verified,
                }
            }
        })
    ],

    callbacks: {
        jwt({ token, user }) {
          if(user) token.role  = user.role
          return token
        },
        session({ session, token }) {
          session.user.role = (token.role ?? "user") as string
          return session
        }
      }

  })