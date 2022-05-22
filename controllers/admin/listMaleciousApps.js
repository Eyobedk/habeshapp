const Admin = require('../../models/Admin')



exports.ListofBadApps = async (req, res)=>
{
    const Listed = await Admin.ListofReportedApps();
    console.log(Listed)
    res.render('admin/BadAppsPage',
    {
        ListofApps: Listed
    })
}