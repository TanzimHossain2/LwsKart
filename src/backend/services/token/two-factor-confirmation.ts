import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        await dbConnect();
        return await db.twoFactorConfirmation.findOne({ userId });
    } catch (err) {
        return null;
    }
}