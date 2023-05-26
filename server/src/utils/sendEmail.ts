import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVICE_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_SERVICE_AUTH_USER,
        pass: process.env.MAIL_SERVICE_GOOGLE_APP_PASSWORD,
      },
    });

    const data = {
      from: process.env.MAIL_SERVICE_AUTH_USER,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(data);
    console.log('email sent sucessfully');

    return { success: true };
  } catch (error) {
    console.log(error, 'email not sent');
    return { success: false };
  }
};
