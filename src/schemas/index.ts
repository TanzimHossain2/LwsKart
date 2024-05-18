import { newPassword } from '@/app/action/auth/new-password'; 
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

export const LoginSchema = z.object({
    code: z.optional(z.string()),
    remember: z.optional(z.boolean()),
}).merge(emailSchema).merge(passwordSchema).merge(statusSchema);

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long",
    }),
    agreement: z.boolean(),
}).merge(emailSchema).merge(passwordSchema).merge(statusSchema);


// validate the user input for the settings page
export const SettingSchema= z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    number: z.optional(z.string().min(10)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["user", "admin"]),
    password : z.optional(z.string()),
    newPassword: z.optional(z.string())
})
.refine((data)=>{
    if( data.password && !data.newPassword){
        return false
    }
    return true
},{
    message: "New password is required",
    path: ["newPassword"]
})
.refine((data)=>{
    if(data.newPassword && !data.password){
        return false
    }
    return true
}
,{
    message: "Current password is required",
    path: ["password"]
})



   
