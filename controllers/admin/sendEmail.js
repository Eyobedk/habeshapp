const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken');
const {Mailer} =require('../../utils/Mail')



exports.sendEmail = async (req,res)=>{
    const {email} = req.body;
    const admin = await Admin.findEmail(email);
   // console.log("dev"+Dev[0]);
    if (typeof admin[0] ==="undefined"){
        let TheError = "Enter your coorect email address";
        res.render('admin/forgot',{Ierror:TheError});
        return
    }
    const id = admin[0].admin_id;
    const secret = process.env.Admin_FORGOT_PASSWORD_SECRET_KEY;
    const token = jwt.sign({id},secret,{expiresIn:'3m',});

    const link = `http://localhost:3000/reset/${id}/${token}`;
    Mailer(email,link);
    res.render('admin/forgot',{Iok:"We have sent reset password link to your Email"});
}