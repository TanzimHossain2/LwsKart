import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginUser } from "./backend/lib/user";

const providers = [
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    profile(profile) {
      return {
        name: profile.name,
        username:
          profile.username ??
          `lKR-${profile.email.split("@")[0].replace(/[^\w\s]/gi, "")}`,
        email: profile.email,
        image: profile.image ?? "/images/avatar.png",
        role: profile.role ?? "user",
        emailVerified: profile.email_verified,
      };
    },
  }),
  FacebookProvider({
    clientId: process.env.AUTH_FACEBOOK_ID,
    clientSecret: process.env.AUTH_FACEBOOK_SECRET,
  }),
  CredentialProvider({
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
  }),
];

const nextAuthConfig: NextAuthConfig = {
  providers: providers,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default nextAuthConfig;
