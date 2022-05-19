const Apps = require('../../models/App')


exports.LoadApps = async (req, res) => {
    //new Apps
    let ListApps = [];
    await Apps.LoadNewApps().then((ListofNewApps)=>{
        ListofNewApps.forEach((file) => {
            ListApps.push([file.appName, file.icon, file.appid,file.appRate,file.views])
        })
    });
    res.render('users/home', {
        ListApps: ListApps,
        Type: "New Apps"
    })
}