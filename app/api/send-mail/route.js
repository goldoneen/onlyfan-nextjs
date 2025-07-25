import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


// Email transporter configuration with Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Transporter configuration error:', error);
  } else {
    console.log('Server ready to send emails');
  }
});

export async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Data validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email' },
        { status: 400 }
      );
    }

    // Get site URL from environment variable
    const siteUrl = process.env.siteUrl || 'https://www.onlyfans-search-finder.com';
    
    // Build email content
    const htmlContent = `
      <h1>New Contact Message from ${siteUrl}</h1>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This message was sent from the contact form at <a href="${siteUrl}">${siteUrl}</a>
      </p>
    `;

    // Get site name from URL
    const siteName = process.env.siteUrl ? new URL(process.env.siteUrl).hostname.replace('www.', '') : 'Your Site';
    
    // Email options
    const mailOptions = {
      from: `"${siteName} Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // Default to sender if no receiver specified
      replyTo: email,
      subject: `[${siteName}] New contact message from ${name}`,
      html: htmlContent,
      text: `Message from ${name} (${email})\n\nMessage:\n${message}\n\nSent from: ${process.env.siteUrl}`, // Text version for clients that don't support HTML
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Detailed error message for debugging
    const errorMessage = error.response 
      ? `SMTP Error: ${error.response}` 
      : 'Error sending email';

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

