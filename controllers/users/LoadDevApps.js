const Apps = require('../../models/App')


exports.LoadDevApps =  async (req, res)=>
{
    let ListApps = [];
    const devId = req.params.devId;
    await Apps.ListApps(devId).then((ListOfDeveloperApps)=>{
        ListOfDeveloperApps.forEach((file) => {
        ListApps.push([file.appName, file.icon, file.appid,file.appRate,file.views])
    })
    })
    
    res.render('users/developer_page', {
        ListApps: ListApps
    })


}