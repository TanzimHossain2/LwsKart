import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
       await dbConnect();
       
        const passwordToken = await db.passwordResetToken.findOne({ token });
        return passwordToken;

    } catch (error) {
        return null;
    }
}
  
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
       await dbConnect();
        const passwordToken = await db.passwordResetToken.findOne({ email });
        return passwordToken;

    } catch (error) {
        return null;
    }
}
  
