import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import CredentialProvider from "next-auth/providers/credentials";
import { getTwoFactorConfirmationByUserId } from "./backend/services/token";
import { getUserById } from "./backend/services/user";
import { getAccountByUserId } from "./backend/services/user/account";
import clientPromise from "./lib/db";
import { db } from "./backend/schema";
import { loginUser } from "./backend/lib/user";



// Define CredentialProvider separately
const credentialProvider = CredentialProvider({
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    if (!credentials.email || !credentials.password) {
      return null;
    }

    try {
      const user = await loginUser({
        email: credentials.email as string,
        password: credentials.password as string,
      });

      if (!user) {
        return null;
      }

      const resUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        username: user.username,
      };

      return resUser;
    } catch (error) {
      throw error;
    }
  },
});

// Merge CredentialProvider with other providers in authConfig
authConfig.providers = [...authConfig.providers, credentialProvider];



export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without  email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      //prevent sign in when email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      //prevent sign in when 2FA is enabled
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser._id
        );
        if (!twoFactorConfirmation) {
          return false;
        }

        //Delete 2FA confirmation  for next sign in

        await db.twoFactorConfirmation.deleteOne({
          userId: twoFactorConfirmation._id,
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role || "user";
      }

      if (session.user) {
        session.user.isTwoFactorEnabled =
          Boolean(token.isTwoFactorEnabled) || false;
        session.user.number = token.number || "";
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isOAuth = token.isOAuth || false;
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

      const existingAccount = await getAccountByUserId(existingUser._id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.isOAuth = existingAccount ? true : false;

      token.role =
        existingUser.role === "user" || existingUser.role === "admin"
          ? existingUser.role
          : "user";

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled || false;
      token.number = existingUser.number || "";

      return token;
    },
  },

  //read more about events here: https://next-auth.js.org/configuration/events
  events: {
    async linkAccount({ user }) {
      await db.user.updateOne(
        { email: user.email },
        { $set: { emailVerified: true } }
      );
    },
  },
});
