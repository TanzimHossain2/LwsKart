import * as z from 'zod';

// Base schema for email
const emailSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
});

// Base schema for password
const passwordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    confirm: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }).optional(),
});

// Base schema for error and success messages
const statusSchema = z.object({
    error: z.string().optional(),
    success: z.string().optional(),
});

// Extended schemas using base schemas.  https://zod.dev/?id=merge
export const ResetSchema = emailSchema.merge(statusSchema);

export const newPasswordSchema = passwordSchema.merge(statusSchema);

export const LoginSchema = emailSchema.merge(passwordSchema).merge(statusSchema);

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long",
    }),
    agreement: z.boolean(),
}).merge(emailSchema).merge(passwordSchema).merge(statusSchema);
