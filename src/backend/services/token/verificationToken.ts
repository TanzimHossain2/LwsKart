import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";


export const getVerficationTokenByEmail = async (email: string) => {
  try {
    await dbConnect();

    const verificationToken = await db.verificationToken.findOne({ email });
    return verificationToken;
  } catch (err) {
    return null;
  }
};

export const getVerficationTokenByToken = async (token: string) => {
  try {
    await dbConnect();

    const verificationToken = await db.verificationToken.findOne({
      token: token,
    });

    return verificationToken;
  } catch (err) {
    return null;
  }
};

// const distroyVerificationToken =
