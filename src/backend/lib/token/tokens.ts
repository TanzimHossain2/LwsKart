import {
  PasswordResetToken,
  TwoFactorConfirmationModel,
  TwoFactorTokenModel,
  verificationTokenModel,
} from "@/backend/schema";
import {
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerficationTokenByEmail,
} from "@/backend/services/token";
import crypto from "crypto";
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

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    try {
      await PasswordResetToken.deleteOne({ _id: existingToken._id });
      console.log("Existing token deleted successfully");
    } catch (error) {
      console.error("Error deleting existing token:", error);
      throw error;
    }
  }

  const newPasswordResetToken = await PasswordResetToken.create({
    email,
    token,
    expires,
  });

  return newPasswordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes
  const existingToken = await getTwoFactorTokenByEmail(email);
  
  if (existingToken) {
    try {
      await PasswordResetToken.deleteOne({ _id: existingToken._id });
      console.log("Existing token deleted successfully");
    } catch (error) {
      console.error("Error deleting existing token:", error);
      throw error;
    }
  }
  
  const twoFactorToken = await TwoFactorTokenModel.create({
    email,
    token,
    expires,
  });

  

  return twoFactorToken;
};
