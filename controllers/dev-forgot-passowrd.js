const {findEmail} = require('../models/Developer')


exports.varifydevEmail = async (req,res)=>{
    const {email} = req.body;
    const Dev = await findEmail(email);
    if(Dev[0]){
        let TheError = "You must be registered inorder to reset password";
        res.render('passwords/developer-forgot',{Ierror:TheError});
        return
    }
}