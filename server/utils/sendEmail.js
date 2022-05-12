const nodemailer = require("nodemailer");
require("dotenv").config()

const sendMail = async ({ email, subject, message }) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
console.log(process.env.NODEMAILER_PASS)
module.exports = sendMail;