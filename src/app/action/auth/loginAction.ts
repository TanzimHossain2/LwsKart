"use server";

import { signIn } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/backend/lib/token";

import { db } from "@/backend/schema";
import {
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
} from "@/backend/services/token";
import { getUserByEmail } from "@/backend/services/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { hashMatched } from "@/utils/hashing";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  try {
    // Validate the fields
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
      return {
        error: "Invalid Fields!",
      };
    }

    const { email, password, code } = validateFields.data;

    // Check if user exists
    const existingUser = await getUserByEmail(email.toLowerCase());

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        error: "Invalid Credentials!",
      };
    }

    // Check if password matches
    const passwordMatch = await hashMatched(password, existingUser.password);
    if (!passwordMatch) {
      return {
        error: "Invalid Credentials!",
      };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      if (!verificationToken) {
        return {
          error: "Something went wrong!",
        };
      }

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      revalidatePath("/auth/login");

      return {
        success: "Confirmation email sent!",
        status: 203, // 203 Non-Authoritative Information
      };
    }

    // Check if user has two factor enabled
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return {
            error: "Invalid Two Factor Code",
          };
        }

        if (twoFactorToken.token !== code) {
          return {
            error: "Invalid Two Factor Code",
          };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) {
          return {
            error: "Two Factor Code has expired",
          };
        }

        await db.twoFactorToken.deleteOne({ _id: twoFactorToken._id });

        const existingConfimation = await getTwoFactorConfirmationByUserId(
          (existingUser._id as unknown as string).toString()
        );

        if (existingConfimation) {
          await db.twoFactorConfirmation.deleteOne({
            _id: existingConfimation._id,
          });
        }

        await db.twoFactorConfirmation.create({
          userId: existingUser._id,
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

        return {
          twoFactor: true,
        };
      }
    }

    console.log(
      "--------------------callbackUrl------------------",
      callbackUrl
    );

    const response = await signIn("credentials", {
      email: email.toLowerCase(),
      password: password,
      redirect: false,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    if (!response) {
      return {
        error: "Invalid Credentials",
      };
    }

    revalidatePath("/");

    console.log("Credentials Signin Response:- ", response);

    return {
      url: response,
      success: "Logged in!",
      status: 200,
    };
    
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          console.log("CredentialsSignin Login Error:- ", err);
          return {
            error: "Invalid Credentials!",
          };
        }

        default: {
          console.log("Default Login Error:- ", err);

          return {
            error: "Something went wrong!",
          };
        }
      }
    }

    console.log("Login Error:- ", err);

    throw err;
  }
}
