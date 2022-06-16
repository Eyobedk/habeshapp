const Apps = require('../../models/App')
const {AlertUser} = require('../../models/Alert')


exports.LoadApps = async (req, res) => {
    let ListApps = [];
    let message;
    const TheMessage = await AlertUser.checkThereIsaMessage();
    
    if(!TheMessage[0])
    {
        message = undefined
    }else{
        message = TheMessage[0].message
    }
    

    await Apps.LoadNewApps().then((ListofNewApps)=>{
        ListofNewApps.forEach((file) => {
            ListApps.push([file.appName, file.icon, file.appid,file.appRate,file.views])
        })
    });
    res.render('users/home', {
        ListApps: ListApps,
        Type: "New Apps",
        message: message
    })
}