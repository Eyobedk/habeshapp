const {findEmail} = require('../models/Developer')
const jwt = require('jsonwebtoken')
const {Mailer}= require('../utils/Mail')
require('dotenv').config();

exports.varifydevEmail = async (req,res)=>{
    const {email} = req.body;
    const Dev = await findEmail(email);
   // console.log("dev"+Dev[0]);
    if (typeof Dev[0] ==="undefined"){
        let TheError = "You must be registered inorder to reset password";
        res.render('passwords/developer-reset',{Ierror:TheError});
        return
    }
    const id = Dev[0].dev_id;
    const secret = process.env.DEVELOPER_FORGOT_PASSWORD_SECRET_KEY;
    const token = jwt.sign({id},secret,{expiresIn:'15m',});

    const link = `http://localhost:3000/developer-reset/${id}/${token}`;
    Mailer(email,link);
    res.render('passwords/developer-reset',{Iok:"We have sent reset password link to your Email"});
}

exports.validateResetTokes = (req, res)=>{
    const {id, token}= req.params;
    console.log("the id:"+id)
    console.log("the token:"+token)
}