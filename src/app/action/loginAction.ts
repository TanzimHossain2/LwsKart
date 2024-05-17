"use server";

import { signIn } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/backend/lib/token";
import { TwoFactorConfirmationModel, TwoFactorTokenModel } from "@/backend/schema";
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from "@/backend/services/token";
import { getUserByEmail } from "@/backend/services/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { LoginSchema } from "@/schemas";
import { hashMatched } from "@/utils/hashing";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
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

      return {
        success: "Confirmation email sent!",
      };
    }

    // Check if user has two factor enabled
    if(existingUser.isTwoFactorEnabled && existingUser.email){
        
        if(code){

            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!twoFactorToken){
                return {
                    error: "Invalid Two Factor Code",
                };
            }

            if(twoFactorToken.token !== code){
                return {
                    error: "Invalid Two Factor Code",
                };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date(); 
            if(hasExpired){
                return {
                    error: "Two Factor Code has expired",
                };
            }

            await TwoFactorTokenModel.deleteOne({ _id: twoFactorToken._id})

            const existingConfimation = await getTwoFactorConfirmationByUserId(existingUser._id.toString());

            if(existingConfimation){
                await TwoFactorConfirmationModel.deleteOne({ _id: existingConfimation._id})
            }

            await TwoFactorConfirmationModel.create({
                userId: existingUser._id,
            })

        } else{
        
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

        return {
            twoFactor: true,
        }
    }

    }

    const response = await signIn("credentials", {
      email: email.toLowerCase(),
      password: password,
      redirect: false,
    });

    if (!response) {
      return {
        error: "Invalid Credentials",
      };
    }

    return {
      user: response,
      success: "Logged in!",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          return {
            error: "Invalid Credentials!",
          };
        }

        default: {
          return {
            error: "Something went wrong!",
          };
        }
      }
    }

    throw err;
  }
}
