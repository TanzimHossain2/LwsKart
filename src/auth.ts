import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import jwt from "jsonwebtoken";
import CredentialProvider from "next-auth/providers/credentials";
import { getTwoFactorConfirmationByUserId } from "./backend/services/token";
import { getUserById } from "./backend/services/user";
import { getAccountByUserId } from "./backend/services/user/account";
import clientPromise from "./lib/db";
import { db } from "./backend/schema";
import { loginUser } from "./backend/lib/user";
import { refreshAccessToken } from "./backend/lib/token/refreshAccessToken";

const secret = process.env.AUTH_SECRET as string;

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
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    async signIn({ user, account }) {
      //  Allow OAuth sign-in without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      // Prevent sign-in if email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Prevent sign-in if 2FA is enabled and not confirmed
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser._id as unknown as string
        );
        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete 2FA confirmation for next sign-in
        await db.twoFactorConfirmation.deleteOne({
          userId: twoFactorConfirmation._id,
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          role: token.role || "user",
          isTwoFactorEnabled: token.isTwoFactorEnabled || false,
          number: token.number,
          name: token.name,
          username: token.username,
          email: token.email as string,
          image: token.image as string,
          isOAuth: token.isOAuth,
        };

        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.accessTokenExpires = token.accessTokenExpires as number;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) {
        return token;
      }

      // console.log("JWT token", token);
      

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(
        existingUser._id as unknown as string
      );

      token = {
        ...token,
        name: existingUser.name,
        email: existingUser.email,
        image: existingUser.image,
        username: existingUser.username,
        isOAuth: existingAccount ? true : false,
        role:
          existingUser.role === "user" || existingUser.role === "admin"
            ? existingUser.role
            : "user",
        isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
        number: existingUser.number || "",
      };

      // Initial sign in
      if (!token.accessToken) {
        const accessToken = jwt.sign(
          {
            sub: existingUser._id.toString(),
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
            number: existingUser.number,
            username: existingUser.username,
            image: existingUser.image,
          },
          secret,
          { expiresIn: "15m" } // Access token expires in 15 minutes
        );

        const refreshToken = jwt.sign(
          {
            sub: existingUser._id.toString(),
            email: existingUser.email,
            role: existingUser.role,
          },
          secret,
          { expiresIn: "7d" } // Refresh token expires in 7 days
        );

        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      }

      // check if access token has expired;  if not, return token
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it using refresh token
      const refreshedTokens = await refreshAccessToken(
        token.refreshToken as string
      );

      // If refresh token has expired, return error
      if (!refreshedTokens) {
        token.accessToken = null;
        token.refreshToken = null;
        token.accessTokenExpires = null;
        token.error = "RefreshTokenExpired";
        return token;
      }

      token.accessToken = refreshedTokens.accessToken;
      token.refreshToken = refreshedTokens.refreshToken;
      token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

      return token;
    },
  },
  logger: {
    error: (message) => console.error("ERROR", message),
    warn: (message) => console.warn("WARN", message),
    debug: (message) => console.debug("DEBUG", message),
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
