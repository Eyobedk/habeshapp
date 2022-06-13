const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken');
const {Mailer} =require('../../utils/Mail')
const bcrypt = require('bcrypt');

var AdminId;


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
    console.log(token, "Admin");

    AdminId = id;
    const link = `http://localhost:3000/admin200/resetpass/${id}/${token}`;
    Mailer(email,link);
    res.render('admin/forgot',{Iok:"We have sent reset password link to your Email"});
}


exports.resetAdminPassword = async (req, res)=>{
    const {password} = req.body;
    console.log(password);
    const hash = bcrypt.hashSync(password, 12);
    console.log(hash)
    if(password.length < 7){
        res.render('admin/reset',{Ierror:"please enter password greater than 8"});
        return
    }
    
    await Admin.updatePassword(AdminId,hash).catch((err)=>{console.log(err)})
    res.redirect('/admin200/login');
}