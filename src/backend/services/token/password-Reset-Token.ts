import { dbConnect } from "@/backend/db/connectDb";
import { PasswordResetToken } from "@/backend/schema";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
       await dbConnect();
        const passwordToken = await PasswordResetToken.findOne({ token });
        return passwordToken;

    } catch (error) {
        return null;
    }
}
  
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
       await dbConnect();
        const passwordToken = await PasswordResetToken.findOne({ email });
        return passwordToken;

    } catch (error) {
        return null;
    }
}
  
