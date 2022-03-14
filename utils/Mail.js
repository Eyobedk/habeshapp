const nodemailer = require('nodemailer');
  
let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "eyobedkebede10@gmail.com",
            pass: "eyobed@403"
        }
});
  
let message = {
    from: "eyobedkebede10@gmail.com",
    to: "leinternet0@gmail.com",
    subject: "Subject",
    html: "<h1>Hello SMTP Email</h1>"
}
  
transporter.sendMail(message, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
})