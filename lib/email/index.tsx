"use server";

interface EmailVerificationProps {
  name: string;
  url: string;
  email: string;
}

import { Resend } from "resend";
import { VerificationTemplate } from "./verfification-temaplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  name,
  url,
}: EmailVerificationProps) {
  const { error } = await resend.emails.send({
    from: "Farahty <no-reply@farahty.com>",
    to: [email],
    subject: "Email Verification",
    react: <VerificationTemplate name={name} url={url} />,
  });
  if (error) {
    console.error("Error sending email:", error);
  }
}
