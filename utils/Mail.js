const nodeMailer = require('nodemailer');

let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: 'eyobedkebede10@gmail.com', 
          pass: 'eyobed@403', 
      },
  });
exports.Mailer = async(resetpassLink)=>{
  let mailOptions = {
    from: 'eyobedkebede10@gmail.com',
    to: 'leinternet0@gmail.com',
    subject: 'Sending Email using Node.js',
    text: resetpassLink
  };

  await transporter.sendMail(mailOptions)
  .then((info)=>{
    console.log(info)
  }).catch(err, console.log("The send email error:" + err))
}