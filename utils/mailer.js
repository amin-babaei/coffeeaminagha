const nodeMailer = require("nodemailer");
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const auth = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REFRESH_TOKEN,
    process.env.OAUTH_LINK
  );
export const sendEmail = async (email, fullName, link) => {
    auth.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    const accessToken = auth.getAccessToken();
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'تغییر رمز عبور',
        html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>سلام ${fullName}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">شما درخواست تغییر رمز عبور داده اید !</span></div><a href=${link} style="width:200px;padding:10px 15px;background:#C19A6B;color:#fff;text-decoration:none;font-weight:600">برای تغیر رمز اینجا کلیک کنید</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">کافی شاپ امین آقا روز خوشی را برای شما آرزومند است</span></div></div>`,
    }
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
};
