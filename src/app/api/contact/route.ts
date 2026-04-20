import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// TODO : IMPLEMENT CAPTCHA MAYBE, ALSO REAL ENV THINGS
export async function POST(req: NextRequest) {
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Zequent Contact" <${process.env.SMTP_USER}>`,
    to: 'office@zequent.com',
    replyTo: email,
    subject: `Contact: ${name}${company ? ` · ${company}` : ''}`,
    text: `Name: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ''}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#ffffff;padding:40px;border-radius:4px;">
        <h2 style="color:#FF6044;margin:0 0 24px;font-weight:300;font-size:24px;">New Contact Request</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);width:100px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#FF6044;">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
        </table>
        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
          <p style="color:rgba(255,255,255,0.4);margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
          <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
