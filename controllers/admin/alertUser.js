const Admin = require("../../models/Admin");
const {AlertUser} = require("../../models/Alert");





exports.AlertUser = async (req, res)=>
{   
    const {message} = req.body;
    const AlertU = new AlertUser(message);
    const checkAlreadyPosted = await AlertUser.checkThereIsaMessage();
    console.log(checkAlreadyPosted[0])
    if( typeof checkAlreadyPosted[0] != undefined)
    {
        await AlertU.Alert().then(()=>{
        res.render('admin/Alert_User',{response:"message is published to users to be seen"})
         });
    }else
    {
        console.log("else")
        await AlertU.AlertUserByUpdate().then(()=>{
            res.render('admin/Alert_User',{response:"message is published to users to be seen"})
        });
    }
    
}
exports.DeleteAlert = async (req, res)=>
{
    const deleteMessage = Object.keys(req.body);
    console.log(deleteMessage);

    const checkAlreadyPosted = await AlertUser.checkThereIsaMessage();
    if(!(checkAlreadyPosted.length == 0))
    {
        await AlertUser.DeleteTheMessage().then(()=>{
        res.redirect(302, '/admin200/alertUser')
         });
        return
    }
    res.redirect('back')
}