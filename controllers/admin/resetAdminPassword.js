const Admin = require('../../models/Admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.resetAdminPassword = async (req, res)=>{
    const {password} = req.body;
    console.log(password);
    const hash = bcrypt.hashSync(password, 12);
    console.log(hash)
    if(password.length < 7){
        res.render('admin/reset',{Ierror:"please enter password greater than 8"})
    }
    
    await Admin.updatePassword(DevID,hash).then(()=>{
        res.redirect(302, 'admin200/login');
    }).catch((err)=>{console.log(err)})
}

module.exports.sendUrl = async (req, res, next) => {
    const {
        token
    } = req.params;
    console.log(token)

    // const user = await Admin.findByID(id);
    
    const secret = process.env.Admin_FORGOT_PASSWORD_SECRET_KEY;
    jwt.verify(token, secret, (err, verified) => {
        if (err) {
            console.log(err)
            res.render('admin/forgot',{alert:"Your link has expired, please send your email again"});
            return
        }
    });
    res.render('admin/reset');
}