const Admin = require("../../models/Admin");





exports.AlertDeveloper = async (req, res)=>
{
    const {message} = req.body;
    const checkAlreadyPosted = await Admin.checkThereIsaMessageforDev();
    if( !checkAlreadyPosted)
    {
        await Admin.AlertDev(message).then(()=>{
        res.render('admin/Alert_Developer',{response:"message is published to developers to be seen"})
         });
        return
    }
    
    await Admin.AlertDevByUpdate(message).then(()=>{
        res.render('admin/Alert_Developer',{response:"message is published to developers to be seen"})
    });
    
    
}
exports.DeleteAlertofDev = async (req, res)=>
{
    const deleteMessage = Object.keys(req.body);
    console.log(deleteMessage);

    const checkAlreadyPosted = await Admin.checkThereIsaMessageforDev();
    if(!(checkAlreadyPosted.length == 0))
    {
        await Admin.DeleteTheMessagefDev().then(()=>{
        res.render('admin/Alert_Developer',{response:"message is removed from the users page"})
         });
    }
    
}