import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!web3formsKey) {
      // Fallback: still return success but log warning
      console.warn("WEB3FORMS_ACCESS_KEY is not set. Email not sent.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact directly at meivels.ece@mkce.ac.in" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3formsKey,
        name,
        email,
        subject: subject || `Portfolio Contact from ${name}`,
        message,
        from_name: "Portfolio Contact Form",
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send the email. Please try again later." },
      { status: 500 }
    );
  }
}
