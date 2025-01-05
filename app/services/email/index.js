const nodemailer = require('nodemailer');
const Mustache = require('mustache');
const { senderEmail, password } = require('../../config');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: senderEmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync('app/views/email/otp.html', 'utf8');

    let message = {
      from: '"noreply" <ilmaaulia@gmail.com>',
      to: email,
      subject: 'One Time Password',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
  }
};

module.exports = { otpMail };
