import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    await dbConnect();

    return await db.twoFactorToken.findOne({ token });
  } catch (err) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    await dbConnect();
    return await db.twoFactorToken.findOne({ email }).sort({
      expires: -1,
    });
  } catch (err) {
    return null;
  }
};
