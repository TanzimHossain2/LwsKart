import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import jwt from "jsonwebtoken";
import CredentialProvider from "next-auth/providers/credentials";
import { getTwoFactorConfirmationByUserId } from "./backend/services/token";
import { getUserById } from "./backend/services/user";;
import clientPromise from "./lib/db";
import { db } from "./backend/schema";
import { loginUser } from "./backend/lib/user";
import appConfig from "./config";



const secret = process.env.AUTH_SECRET as string;


// type provider = "google" | "facebook" | "github" | "credentials";


async function refreshAccessToken(token : any, provider: string) {
  try {

    let url ;
    let body;
    let headers = {
      'Content-Type': 'application/json'
    };

    switch (provider) {

      case provider = "google": {
        url = "https://oauth2.googleapis.com/token" 
        body = new URLSearchParams({
          client_id: process.env.AUTH_GOOGLE_ID as string,
          client_secret: process.env.AUTH_GOOGLE_SECRET as string,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        break;
      }

      case provider = "credentials": {
        console.log("credentials provider")
        
        url = `${appConfig.baseUrl}/api/auth/refresh-token`;
        body = JSON.stringify({ refresh_token: token.refreshToken });

        break;
      }
    }


  const res = await fetch(url as string, {
    headers,
    body,
    method: 'POST',
    cache: 'no-cache',
  })

  const refreshedTokens = await res.json();
  // console.log("refreshedTokens", refreshedTokens);
  
  if(!res.ok){
    throw refreshedTokens;
  }

  return {
    ...token,
    accessToken: refreshedTokens?.access_token,
    accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000, 
    refreshToken: refreshedTokens?.refresh_token,
  }    

  } catch (err) {
    console.log("Error in refreshAccessToken1", err); 
    
    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }

}



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

      console.log("user credeb", user);
      

      const resUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        username: user.username,
        isOAuth: user.isOAuth,
        number: user.number,
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
          id: token.user.id as string,
          role: token.user.role || "user",
          isTwoFactorEnabled: token.user.isTwoFactorEnabled || false,
          number: token.user.number,
          name: token.user.name,
          username: token.user.username,
          email: token.user.email as string,
          image: token.user.image as string,
          isOAuth: token.user.isOAuth,
        };
        session.provider = token.provider;
        session.error = token.error as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.accessTokenExpires = token.accessTokenExpires as number;
      }

      return session;
    },

    async jwt({ token, user , account, trigger}) {

      if(account && user) {

        if(account.provider === "credentials") {
          //initial sign in

          interface IUser {
            id: string;
            email: string;
            name: string;
            role: string;
            number: string; 
            username: string;
            image: string;
          }
          
          if(!token.accessToken){
            const accessToken = jwt.sign(
              {
                // @ts-ignore
                id: user.id.toString(),
                email: user.email,
                name: user.name,
                role: (user as any).role,
                number: (user as any).number,
                username: (user as any).username,
                image: user.image,
              },
              secret,
              { expiresIn: "1h" } // Access token expires in 1 hour
            );
        
            const refreshToken = jwt.sign(
              {
                // @ts-ignore
                id: user.id.toString(),
                email: user.email,
                 role: (user as any).role,
              },
              secret,
              { expiresIn: "7d" } // Refresh token expires in 7 days
            );
        
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.accessTokenExpires = Date.now() +  60  *  60 * 1000; //  1 hour

              return  {
                provider: account.provider,
                accessToken: token.accessToken,
                accessTokenExpires: token.accessTokenExpires,
                refreshToken: token.refreshToken,
                user
              }
          }

        }   
        
        return {
          provider: account.provider,
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + (account?.expires_in as number) * 1000,
          refreshToken: account?.refresh_token,
         user
        }  
      }        
      
    // console.log(`Token Will Expire at ${new Date(token.accessTokenExpires)})`); 

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      } 

      // console.log(`Token Expired at ${new Date(Date.now())}`)

      return  await refreshAccessToken(token, token.provider);  
    }, 

    async redirect({ url, baseUrl }) {
      // Ensure redirects are only to allowed URLs
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
 
  },

  logger: {
    error: (message) => console.error("ERROR", message),
    warn: (message) => console.warn("WARN", message),
    debug: (message) => console.debug("DEBUG", message),
  },


  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },

    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },

    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
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
