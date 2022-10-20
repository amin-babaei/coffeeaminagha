const nodeMailer = require("nodemailer");

export const sendEmail = (email, fullName, subject, message) => {
    const transporter = nodeMailer.createTransport({
        service: "hotmail",
        auth: {
            user: "coffeeaminagha@outlook.com",
            pass: "amin12345",
        },
    });
    transporter.sendMail({
        from: "coffeeaminagha@outlook.com",
        to: email,
        subject: subject,
        html: `<h1> سلام ${fullName}</h1>
                <br/>
            <p>${message}</p>`,
    });
};
