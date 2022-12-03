const nodeMailer = require("nodemailer");

export const sendEmail = async (email, fullName, subject, message) => {
    const transporter = nodeMailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: `<h1> سلام ${fullName}</h1>
                <br/>
            <p>${message}</p>`,
    });
};
