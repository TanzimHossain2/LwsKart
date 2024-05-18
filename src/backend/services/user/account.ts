import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const getAccountByUserId = async (userId: string) => {
  try {
    await dbConnect();
    const account = await db.account.findOne({ userId: userId });
    return account;
  } catch (err) {
    return null;
  }
};
