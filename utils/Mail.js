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
exports.Mailer = async(email, resetpassLink)=>{
  let mailOptions = {
    from: process.env.EMAIL,
    to:  email,
    subject: 'Sending Email using Node.js',
    text: resetpassLink
  };

  await transporter.sendMail(mailOptions)
  .then(()=>{
  }).catch((err)=>{ 
    console.log("The send email error:" + err)
    console.log("The send email error:" + err.code)
  }
    )
}