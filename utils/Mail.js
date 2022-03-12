const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        host: 'hostname',
        port: 587,
        secure:false,
        requireTLS:true,
        user:"leinternet0@outlook.com",
        pass:process.env.EMAIL_PASS
    }
})

const options = {
    from:"leinternet0@gmail.com",
    to:"eyobedkebede05@gmail.com",
  //  template: 'email', 
    subject:"testing message",
}

// trigger the sending of the E-mail
transporter.sendMail(options, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


