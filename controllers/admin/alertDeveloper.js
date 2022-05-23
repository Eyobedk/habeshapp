const Admin = require("../../models/Admin");





exports.AlertDeveloper = async (req, res)=>
{
    const {message} = req.body;
    const checkAlreadyPosted = await Admin.checkThereIsaMessageforDev();
    console.log(checkAlreadyPosted[0].length)
    if( checkAlreadyPosted.length == 0)
    {
        await Admin.AlertDev(message).then(()=>{
        res.render('admin/alertDev',{response:"message is published to developers to be seen"})
         });
    }else
    {
        console.log("else")
        await Admin.AlertDevByUpdate(message).then(()=>{
            res.render('admin/alertDev',{response:"message is published to developers to be seen"})
        });
    }
    
}
exports.DeleteAlertofDev = async (req, res)=>
{
    const deleteMessage = Object.keys(req.body);
    console.log(deleteMessage);

    const checkAlreadyPosted = await Admin.checkThereIsaMessageforDev();
    if(!(checkAlreadyPosted.length == 0))
    {
        await Admin.DeleteTheMessagefDev().then(()=>{
        res.render('admin/alertDev',{response:"message is removed from the users page"})
         });
    }
    
}