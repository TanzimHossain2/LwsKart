"use server"

import { signIn  } from "@/auth"
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

        const response = await signIn("credentials",{
            email: values.email.toLowerCase(),
            password: values.password,
            redirect: false
        });

        if(!response){
            return {
                error: "Invalid Credentials"
            }
        }

        return {
            user: response
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