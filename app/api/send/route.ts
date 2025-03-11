import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { from_name, from_email, message } = body;

    const data = await resend.emails.send({
      from: "Lucy W. Mwangi <onboarding@resend.dev>", // Update this with your verified domain
      to: ["lucywanjirumwangi21@gmail.com"], // Your email where you want to receive messages
      subject: `New Contact Form Message from ${from_name}`,
      text: `
Name: ${from_name}
Email: ${from_email}
Message: ${message}
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
