import { dbConnect } from "@/backend/db/connectDb";
import { TwoFactorTokenModel } from "@/backend/schema";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    await dbConnect();
    return await TwoFactorTokenModel.findOne({ token });
  } catch (err) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    await dbConnect();
    return await TwoFactorTokenModel.findOne({ email }).sort({
      expires: -1,
    }); 
  } catch (err) {
    return null;
  }
};
