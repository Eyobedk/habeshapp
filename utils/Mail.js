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
  
transporter.sendMail(message, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
})


let mailOptions = {
  from: 'eyobedkebede10@gmail.com',
  to: 'leinternet0@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
     console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
});