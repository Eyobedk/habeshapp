const Admin = require('../../models/Admin')



exports.resetAdminPassword = async (req, res)=>{
    const {password} = req.body;
    console.log(password)
    const hash = bcrypt.hashSync(password, 12);
    console.log(hash)
    if(password.length < 7){
        res.render('admin/reset',{Ierror:"please enter password greater than 8"})
    }
    
    await Admin.updatePassword(DevID,hash).then(()=>{
        res.redirect(302, 'admin200/login');
    }).catch((err)=>{console.log(err)})
}