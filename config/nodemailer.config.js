import { createTransport } from "nodemailer";
import "dotenv/config";

const config = {
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
  tls: {
    ciphers: "SSLv3",
  },
};

const send = async ({ email, verificationToken }) => {
  const transporter = createTransport(config);

  const emailOptions = {
    from: process.env.NODEMAILER_FROM_MAIL,
    to: email,
    subject: "Email verification link",
    text: `Email  from verification link: /users/verify/${verificationToken}`,
  };
  return await transporter
    .sendMail(emailOptions)
    .then((info) => {
      console.log(info);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default send;
