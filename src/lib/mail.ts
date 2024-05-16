import appConfig from '@/config';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${appConfig.baseUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "lwsKart@resend.dev",
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