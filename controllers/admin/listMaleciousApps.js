const {BlackList} = require('../../models/Admin')



exports.ListofBadApps = async (req, res)=>
{
    const Listed = await BlackList.ListofReportedApps();
    console.log(Listed)
    res.render('admin/Reported_apps',
    {
        ListofApps: Listed
    })
}