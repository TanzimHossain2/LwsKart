"use server"

import { signIn  } from "@/auth"

type IFormData = {
    email: string;
    password: string;
}

export async function login(formData:IFormData){
    try {

        const response = await signIn("credentials",{
            email: formData.email.toLowerCase(),
            password: formData.password
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
        return {
            error: (err as Error).message
        }
    }
}