"use server"

import { db } from "@/backend/schema";
import { getVerficationTokenByToken } from "@/backend/services/token"
import { getUserByEmail } from "@/backend/services/user"

export const newVerification = async (token: string) => {
    const existingToken = await getVerficationTokenByToken(token);
    console.log("existingToken", existingToken);
    
    if(!existingToken){
        return {
            error: "Invalid Token!"
        }
    }

    const hasExpired = new Date() > new Date(existingToken.expires);
    console.log("hasExpired", hasExpired);

    if(hasExpired){
        return {
            error: "Token has expired!"
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {
            error: "Email not found!"
        }
    }

   
    await  db.user.updateOne({ _id: existingUser._id }, { emailVerified: true, email: existingToken.email });

    // Delete the token
    await existingToken.deleteOne({ _id: existingToken._id})

    return {
        success: "Email verified!"
    }

}

