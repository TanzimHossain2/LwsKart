"use server";
import { db } from "@/backend/schema";
import { getPasswordResetTokenByToken } from "@/backend/services/token";
import { getUserByEmail } from "@/backend/services/user";
import { newPasswordSchema } from "@/schemas";
import { generateHash } from "@/utils/hashing";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return {
      error: "missing token",
    };
  }

  const validateFields = newPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const hashedPassword = await generateHash(password);

  await db.user.updateOne(
    { _id: existingUser._id },
    { password: hashedPassword }
  );

  await db.passwordResetToken.deleteOne({ _id: existingToken._id });

  return {
    success: "Password updated",
  };
};
