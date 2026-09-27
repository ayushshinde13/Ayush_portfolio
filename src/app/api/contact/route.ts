import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, website } = body;

    // Honeypot spam trap: Bots usually fill hidden inputs
    if (website) {
      // Silently accept without processing to fool bots
      return NextResponse.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    // Required fields validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    // In a production environment with Resend or SendGrid:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });
    // For portfolio demo, log received submission cleanly:
    console.log('[Contact Form Submission Received]', {
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your transmission was safely delivered.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
