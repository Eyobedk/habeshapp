const {Admin} = require('../../models/Admin')
const bcrypt = require('bcrypt')
const {
    createTokenforAdmin
  } = require('../../utils/TokenHandler');
const { getMaxListeners } = require('../../db/database');


exports.logMeIn = async (req, res)=>
{
    const {email,password} = req.body;
    const adm = await Admin.findEmail(email);
  
    if (!adm[0]) {
      let outErrors = 'enter the correct password and email';
      res.render("admin/Login", {
        outErrors
      });
      return
    }
    
    const flag = await bcrypt.compare(password, adm[0].admin_password).then(function (result) {
      if (!result) {
        const Ierror = "Enter the correct email and password";
        res.render('admin/Login', {
          Ierror
        });
        return 1;
      }
    });
    if(flag == 1)
    {
      return
    }
    const token = createTokenforAdmin(JSON.stringify(adm[0].admin_id));
    res.cookie('whwhwyasadador', token, {
      httpOnly: true,
      maxAge: 6000000
    }).redirect(302, '/admin200');
}


exports.register = (req, res)=>{
    const email = "";
    const password = "";
    const dev = new Admin(email, password);
    dev.save().then(async ()=>{

        const getID = await Admin.findEmail(email);
        console.log("THE admin ID" + getID[0]["admin_id"]);
        
        const token = createTokenforAdmin(JSON.stringify(getID[0]["admin_id"]));
        console.log("here dev " + token);
        res.cookie('whwhwyasadador', token,{
            httpOnly: true,
            maxAge: 600000,
        }).redirect(302, '/admin200');
    });
}

