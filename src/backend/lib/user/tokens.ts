import { verificationTokenModel } from "@/backend/schema";
import { getVerficationTokenByEmail } from "@/backend/services/token";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); // 4 hours
  const existingToken = await getVerficationTokenByEmail(email);

  if (existingToken) {
    try {
      await verificationTokenModel.deleteOne({ _id: existingToken._id });
      console.log("Existing token deleted successfully");
    } catch (error) {
      console.error("Error deleting existing token:", error);
      throw error; 
    }
  }

  const newVerificationToken = await verificationTokenModel.create({
    email,
    token,
    expires,
  });


    return newVerificationToken;
};
