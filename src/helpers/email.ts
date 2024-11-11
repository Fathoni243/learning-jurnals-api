import nodemailer from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const option = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

export const sendingEmail = async ({ from, to, subject, html }: MailOptions) => {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      html,
    };

    const Transporter = nodemailer.createTransport(option as any);

    await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
