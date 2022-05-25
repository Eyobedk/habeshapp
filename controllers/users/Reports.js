const Apps = require('../../models/App')
const Admin  = require('../../models/Admin')

exports.ReportApp = async (req, res,next)=>{
    const reported = req.body.report;
    console.log(reported);
    let avarageReport;
    if(reported){
        const ReportedList = await Apps.checkAppisReported(req.params.appid, res.locals.userId);
        if(ReportedList.length == 0)
        {
            await Apps.ReportApp(req.params.appid)
            await Apps.InserttoReporteds(res.locals.userId, req.params.appid)

            const [RatesandDownloads, _] = await Apps.GetReportandDownload(req.params.appid);
            avarageReport = parseFloat(RatesandDownloads.downloads / RatesandDownloads.appReports);
            const FoundAppIdfromBlackList = await Admin.checkAppisBlackListed(req.params.appid);
            // console.log()
            if(RatesandDownloads.appReports >= avarageReport)
            {
                if(!FoundAppIdfromBlackList.length)
                {
                    await Apps.AddtoblackListAppsTable(RatesandDownloads.icon, RatesandDownloads.appName, RatesandDownloads.appReports, req.params.appid).catch((err)=>{
                    console.log(err);
                    });
                    await Apps.updateStatus(RatesandDownloads.dev_id).catch((err)=>{console.log(err)})
                }
            }
            
        }
        else{}
    res.redirect('back')
}
    // next();
}