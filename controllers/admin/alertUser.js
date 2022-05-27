const Admin = require("../../models/Admin");





exports.AlertUser = async (req, res)=>
{
    const {message} = req.body;
    const checkAlreadyPosted = await Admin.checkThereIsaMessage();
    console.log(checkAlreadyPosted[0])
    if( typeof checkAlreadyPosted[0] != undefined)
    {
        await Admin.AlertUser(message).then(()=>{
        res.render('admin/Alert_User',{response:"message is published to users to be seen"})
         });
    }else
    {
        console.log("else")
        await Admin.AlertUserByUpdate(message).then(()=>{
            res.render('admin/Alert_User',{response:"message is published to users to be seen"})
        });
    }
    
}
exports.DeleteAlert = async (req, res)=>
{
    const deleteMessage = Object.keys(req.body);
    console.log(deleteMessage);

    const checkAlreadyPosted = await Admin.checkThereIsaMessage();
    if(!(checkAlreadyPosted.length == 0))
    {
        await Admin.DeleteTheMessage().then(()=>{
        res.render('admin/Alert_User',{response:"message is removed from the users page"})
         });
    }
    
}