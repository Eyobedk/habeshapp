const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path');

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        host: 'hostname',
        port: 587,
        secure:false,
        requireTLS:true,
        user:"leinternet0@outlook.com",
        pass:"eyobed@403"
    }
})

// const handlebarOptions = {
//     viewEngine: {
//         partialsDir: path.resolve('../views/'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('../views/'),
// };

// // use a template file with nodemailer
// transporter.use('compile', hbs(handlebarOptions))


const options = {
    from:"leinternet0@gmail.com",
    to:"eyobedkebede05@gmail.com",
  //  template: 'email', 
    subject:"testing message",
    // context:{
    //     name: "Eyobed", // replace {{name}} with Adebola
    //     company: 'Habeshapp' // replace {{company}} with My Company
    // }
}

// trigger the sending of the E-mail
transporter.sendMail(options, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


