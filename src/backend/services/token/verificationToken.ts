import { dbConnect } from "@/backend/db/connectDb";
import { verificationTokenModel } from "@/backend/schema";

export const getVerficationTokenByEmail = async (email: string) => {
  try {
    await dbConnect();
    const verificationToken = await verificationTokenModel.findOne({ email });
    return verificationToken;
  } catch (err) {
    return null;
  }
};

export const getVerficationTokenByToken = async (token: string) => {
  try {
    await dbConnect();

    const verificationToken = await verificationTokenModel.findOne({token: token });

    return verificationToken;
  } catch (err) {
    return null;
  }
};

// const distroyVerificationToken = 
