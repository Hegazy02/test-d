import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = "smtp.hostinger.com";
const SMTP_PORT = 465;
const SMTP_USER = "info@workwithdarb.com";
const SMTP_PASS = "bt*;kzK5Y@";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, tag, office } = await request.json();

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: {
        name: "Work With Darb",
        address: "info@workwithdarb.com",
      },
      to: {
        name: "Darb Productions",
        address: "hello@darbproductions.com",
      },
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || ""}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>from:</strong> ${tag || "i don't know"}</p>
        <p><strong>office:</strong> ${office || ""}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("done done done", info);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      info,
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error?.message || "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}
