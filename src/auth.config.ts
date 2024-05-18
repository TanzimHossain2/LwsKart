import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthConfig } from "next-auth";

const googleAndFacebookProviders = [
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
    profile(profile) {
      return {
        id: profile.sub,
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
];

const nextAuthConfig: NextAuthConfig = {
  providers: googleAndFacebookProviders,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default nextAuthConfig;
