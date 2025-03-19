import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import type { MailDataRequired } from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface ContactFormData {
  name: string;
  email: string;
  enquiry: string;
}

/**
 * Handles contact form submissions
 * Validates input and sends email using SendGrid
 */
export async function POST(request: Request) {
  try {
    const { name, email, enquiry } = await request.json() as ContactFormData;

    // Validate inputs
    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare email content
    const msg: MailDataRequired = {
      to: process.env.NOTIFICATION_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Enquiry: ${enquiry}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Enquiry:</strong></p>
<p>${enquiry.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
