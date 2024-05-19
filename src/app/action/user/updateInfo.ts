"use server";
import { generateVerificationToken } from "@/backend/lib/token";
import { db } from "@/backend/schema";

import { getUserByEmail, getUserById } from "@/backend/services/user";
import { currentUser } from "@/lib/authUser";
import { sendVerificationEmail } from "@/lib/mail";
import { SettingSchema } from "@/schemas";
import { generateHash, hashMatched } from "@/utils/hashing";
import { sanitizeData } from "@/utils/sanitizeData.utils";
import * as z from "zod";

export const updateInfo = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You need to be authenticated to update your info",
    };
  }

  const dbUser = await getUserById(user.id || "");

  if (!dbUser) {
    return {
      error: "User not found",
    };
  }

  if (dbUser.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Check if the email is being updated
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser._id.toString() !== dbUser._id.toString()) {
      return {
        error: "Email already exists",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Verification email sent",
    };
  }

  // Check if the password is being updated
  if (values.password && values.newPassword && dbUser.password) {
    const match = await hashMatched(values.password, dbUser.password);

    if (!match) {
      return {
        error: "Password is incorrect",
      };
    }

    const hashedPassword = await generateHash(values.newPassword);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  

  // Sanitize the data
  const sanitizedValues = sanitizeData(values);
  //remove newPassword from the sanitized values
  if (sanitizedValues.newPassword) {
    delete sanitizedValues.newPassword;
  }

  console.log("values", sanitizedValues);

  const res = await db.user.findByIdAndUpdate(
    dbUser._id,
    { $set: sanitizedValues },
    { new: true, runValidators: true }
  );

  if (!res) {
    return {
      error: "Failed to update user info",
    };
  }

  return {
    success: "User info updated successfully",
  };
};
