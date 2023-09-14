const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
const sendEmail = async ({ to, link }) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: "We send your verification link!",
    text: `To verify your account, please activate your profile by using this link: ${link}`,
  };
  return await transporter
    .sendMail(emailOptions)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = sendEmail;
