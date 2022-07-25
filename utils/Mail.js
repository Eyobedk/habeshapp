const nodeMailer = require('nodemailer');
require('dotenv').config();

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
  }
});
exports.Mailer = async(email, resetpassLink)=>{
  let mailOptions = {
    from: `HABESHAPP <${process.env.EMAIL}>`,
    to:  email,
    subject: 'Forgot password reset link',
    generateTextFromHTML: true,
    html: `<b> ${resetpassLink} </b>`
  };

  await transporter.sendMail(mailOptions)
  .then(()=>{
  }).catch((err)=>{ 
    console.log("The send email error:" + err)
    console.log("The send email error:" + err.code)
  }
    )
}

// async function Mailer(email, resetpassLink) {
//   let mailOptions = {
//     from: `HABESHAPP <${process.env.EMAIL}>`,
//     to:  email,
//     subject: 'Forgot password reset link',
//     generateTextFromHTML: true,
//     html: `<b> ${resetpassLink} </b>`
//   };

//   try
//   {
//     await transporter.sendMail(mailOptions).then(async function(theresult){
//       global.Mailresult = theresult.accepted[0];
//     });
//     return Mailresult;
//   }
//   catch(err){
//     console.log("The send email error:" + err)
//     console.log("The send email error:" + err.code)
//   }
// }

// module.exports = {Mailer}