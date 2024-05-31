import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

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
        number: profile.number ?? "xxx-xxx-xxx",
      };
    },

  }),


  GitHubProvider({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
   profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name,
      username: profile.login,
      email: profile.email,
      image: profile.avatar_url,
      role: profile.role ?? "user",
      emailVerified: profile.email_verified,
      number: profile.number ?? "xxx-xxx-xxx",
    }
   }
  }),

];

const nextAuthConfig: NextAuthConfig = {
  providers: googleAndFacebookProviders,
  secret: process.env.AUTH_SECRET,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  jwt: {
    // @ts-ignore
    secret: process.env.AUTH_SECRET as string,
    encryption: true,
  }

};

export default nextAuthConfig;
