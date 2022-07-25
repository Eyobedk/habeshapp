const {Admin} = require("../../models/Admin");
const {AlertDevelopers} = require("../../models/Alert");





exports.AlertDeveloper = async (req, res)=>
{
    const {message} = req.body;

    const dev = new AlertDevelopers(message)
    const checkAlreadyPosted = await AlertDevelopers.checkThereIsaMessage();
    console.log(checkAlreadyPosted.length)
    if(checkAlreadyPosted.length == 0)
    {
        console.log(checkAlreadyPosted)
        await dev.Alert().then(()=>{
        res.render('admin/Alert_Developer',{response:"message is published to developers to be seen"})
         });
        return
    }
    
    await dev.AlertDevByUpdate().then(()=>{
        res.render('admin/Alert_Developer',{response:"message is published to developers to be seen"})
    });
       
}
exports.DeleteAlertofDev = async (req, res)=>
{
    const deleteMessage = Object.keys(req.body);
    console.log(deleteMessage);

    const checkAlreadyPosted = await AlertDevelopers.checkThereIsaMessage();
    console.log(checkAlreadyPosted)
    if(checkAlreadyPosted.length  != 0)
    {
        await AlertDevelopers.DeleteTheMessage().then(()=>{
        res.redirect(302, '/admin200/alertDev')});
         return
    }
    res.redirect(302, '/admin200/alertDev');
}