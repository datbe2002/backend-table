const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendMail = async ({ email, html }) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Nhahangcuatoi"<no-reply@nhahang.com>',
    to: email, // list of receivers
    subject: "Change password", // Subject line
    html: html, // html body
  });
  return info;
};

module.exports = sendMail;
