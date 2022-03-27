const nodeMailer = require('nodemailer');
require('dotenv').config()
let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAIL_PASS, 
      },
  });
exports.Mailer = async(resetpassLink)=>{
  let mailOptions = {
    from: process.env.EMAIL,
    to:  process.env.EMAIL2,
    subject: 'Sending Email using Node.js',
    text: resetpassLink
  };

  await transporter.sendMail(mailOptions)
  .then((info)=>{
    console.log(info)
  }).catch(err, console.log("The send email error:" + err))
}