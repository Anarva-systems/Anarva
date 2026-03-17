import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, details, projectType, budget, phone, location, languages } = body;

        // Basic Validation
        if (!name || !email || !details) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify credentials exist
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing EMAIL_USER or EMAIL_PASS in .env');
            return NextResponse.json(
                { message: 'Server misconfigured: Missing email credentials' },
                { status: 500 }
            );
        }

        // Configure Transporter (Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email Draft
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send validation copy to self/owner
            replyTo: email,
            subject: `[ANARVA] New Lead: ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #1e293b; margin-bottom: 24px;">🚀 New Project Inquiry</h2>
                    
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p style="margin: 8px 0;"><strong>Location:</strong> ${location || 'N/A'}</p>
                        <p style="margin: 8px 0;"><strong>Languages Known:</strong> ${languages || 'N/A'}</p>
                        <p style="margin: 8px 0;"><strong>Company:</strong> ${company || 'N/A'}</p>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <p><strong>Project Type:</strong> <span style="background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${projectType}</span></p>
                        <p><strong>Budget:</strong> <span style="background-color: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${budget}</span></p>
                    </div>

                    <div style="border-top: 1px solid #e2e8f0; paddingTop: 20px;">
                        <h3 style="color: #475569; font-size: 16px;">Project Vision:</h3>
                        <p style="color: #334155; line-height: 1.6;">${details}</p>
                    </div>
                </div>
            `,
        };

        // Send
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
