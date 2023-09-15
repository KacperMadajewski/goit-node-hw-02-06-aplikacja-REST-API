const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  pool: true,
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "kac.madajewski@gmail.com",
    pass: "pFKqfYs8BQHOAtzm",
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
