const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config()

async function main() {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "eyobedkebede10@gmail.com", // generated ethereal user
            pass: "eyobed@403", // generated ethereal password
        },
    });



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" eyobedkebede10@gmail.com', // sender address
        to: "leinternet0@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}
main();