import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import clientPromise from "./lib/db";
import { getUserById } from "./backend/services/user";
import { TwoFactorConfirmationModel, userModel } from "./backend/schema";
import { getTwoFactorConfirmationByUserId } from "./backend/services/token";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: MongoDBAdapter(clientPromise),
  ...authConfig,

  callbacks: {

    async signIn({user, account}){

      //Allow OAuth without  email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      //prevent sign in when email is not verified
      if(!existingUser?.emailVerified){
        return false
      }

      
      //prevent sign in when 2FA is enabled
      if(existingUser?.isTwoFactorEnabled){
        const twoFactorConfirmation  = await getTwoFactorConfirmationByUserId(existingUser._id);
        if(!twoFactorConfirmation){
          return false
        }

        //Delete 2FA confirmation  for next sign in
        await TwoFactorConfirmationModel.deleteOne({userId: twoFactorConfirmation._id});
      }
      

       return  true
    },



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

  //read more about events here: https://next-auth.js.org/configuration/events
  events: {
    async linkAccount({user}){
     await userModel.updateOne({email: user.email}, { $set: {emailVerified: true}});
    }
  }

});
