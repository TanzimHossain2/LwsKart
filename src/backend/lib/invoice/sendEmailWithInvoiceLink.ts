import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// const fromEmail = process.env.NEXT_PUBLIC_DOMAIN_NAME as string;
const fromEmail = `lwsKart@${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;

export const sendEmailWithInvoiceLink = async (email: string, invoiceUrl: string) => {

  const subject = 'Your Order Invoice';
  const body = `
    <p>Dear Customer,</p>
    <p>Thank you for your order. You can download your invoice from the link below:</p>
    <a href="${invoiceUrl}">Download Invoice</a>
    
    <p>If you have any questions, please feel free to contact us.</p>

    <p>Thanks,</p>
    <p>Your friends at lwsKart</p>
  `;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: subject,
      html: body,
    });
  } catch (error) {
    throw new Error(`Failed to send email: ${(error as Error).message}`);
  }
};
