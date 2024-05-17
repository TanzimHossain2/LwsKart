"use server"

import { signIn  } from "@/auth"
import { generateVerificationToken } from "@/backend/lib/user";
import { getUserByEmail } from "@/backend/services/user";
import { sendVerificationEmail } from "@/lib/mail";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from 'zod';


export async function login(values: z.infer<typeof LoginSchema>){

    try {
        // Validate the fields
        const validateFields = LoginSchema.safeParse(values);
        

        if(!validateFields.success){
            return {
                error: "Invalid Fields!"
            }
        }

        const { email, password} = validateFields.data;

        // Check if user exists
        const existingUser = await getUserByEmail(email.toLowerCase());
      
        if(!existingUser || !existingUser.email || !existingUser.password){
            return {
                error: "Invalid Credentials!"
            }
        }
        

        if(!existingUser.emailVerified){
            const verificationToken = await generateVerificationToken(existingUser.email);

            if(!verificationToken){
                return {
                    error: "Something went wrong!"
                }
            }


            await sendVerificationEmail(verificationToken.email, verificationToken.token);

            return {
                success: "Confirmation email sent!"
            }

        }


        const response = await signIn("credentials",{
            email: email.toLowerCase(),
            password: password,
            redirect: false
        });

        if(!response){
            return {
                error: "Invalid Credentials"
            }
        }

        return {
            user: response,
            success: "Logged in!"
        }

    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin" : {
                    return {
                        error: "Invalid Credentials!"
                    }
                }

                default: {
                    return {
                        error: "Something went wrong!"
                    }
                }
            }
        }

        throw err;
    }
}