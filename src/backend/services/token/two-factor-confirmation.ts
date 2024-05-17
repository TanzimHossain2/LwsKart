import { dbConnect } from "@/backend/db/connectDb";
import { TwoFactorConfirmationModel } from "@/backend/schema";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        await dbConnect();
        return await TwoFactorConfirmationModel.findOne({ userId });
    } catch (err) {
        return null;
    }
}