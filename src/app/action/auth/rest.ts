"use server"
import * as z from 'zod';
import { getUserByEmail } from "@/backend/services/user"
import { ResetSchema } from "@/schemas"
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/backend/lib/token';
import { dbConnect } from '@/backend/db/connectDb';


export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Invalid email"
        }
    }

    const { email } = validateFields.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: "User not found"
        }
    }
    
    // Generate a password reset token
    const PasswordResetToken = await generatePasswordResetToken(email);

    if (!PasswordResetToken) {
        return {
            error: "Error generating token"
        }
    }

    await sendPasswordResetEmail(PasswordResetToken.email, PasswordResetToken.token);

    return {
        success: "Reset email sent"
    }
}

