import nodemailer from "nodemailer";

const sendEmail = async (options : any) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const messagge = {
        from : `${process.env.STMP_FROM_NAME} <${process.env.STMP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(messagge);
}

export default sendEmail;