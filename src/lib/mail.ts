import appConfig from '@/config';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// const fromEmail = process.env.NEXT_PUBLIC_DOMAIN_NAME as string;
const fromEmail = `lwsKart@${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${appConfig.baseUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Verify your email address",
        html: `
            <h1>Verify your email address</h1>
            <p>Click the link below to verify your email address.</p>
            <a href="${confirmLink}">Verify your email address</a>

            <p>If you didn't create an account, you can safely ignore this email.</p>

            <p>Thanks,</p>
            <p>Your friends at lwsKart</p>
        `
    })
}


export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${appConfig.baseUrl}/auth/reset-password?token=${token}`;

    await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Reset your password",
        html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password.</p>
            <a href="${resetLink}">Reset your password</a>

            <p>If you didn't request a password reset, you can safely ignore this email.</p>

            <p>Thanks,</p>
            <p>Your friends at lwsKart</p>
        `
    })
}


export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Two-factor authentication code",
        html: `
            <h1>Two-factor authentication code</h1>
            <p>Your two-factor authentication code is:</p>
            <h2>${token}</h2>

            <p>If you didn't request this code, you can safely ignore this email.</p>

            <p>Thanks,</p>
            <p>Your friends at lwsKart</p>
        `
    })
}