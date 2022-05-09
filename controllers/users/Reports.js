const Apps = require('../../models/App')


exports.ReportApp = async (req, res,next)=>{
    const reported = req.body.report;
    let avarageReport;
    if(reported){
        const ReportedList = await Apps.checkAppisReported(req.params.appid, res.locals.userId);
        if(ReportedList.length == 0)
        {
            await Apps.ReportApp(req.params.appid)
            await Apps.InserttoReporteds(res.locals.userId, req.params.appid)

            const [RatesandDownloads, _] = await Apps.GetReportandDownload(req.params.appid);
            avarageReport = parseFloat(RatesandDownloads.appReports / RatesandDownloads.downloads);

            if(avarageReport >= RatesandDownloads.downloads)
            {
                await Apps.AddtoblackListAppsTable(req.params.appid, RatesandDownloads.dev_id).catch((err)=>{
                    console.log(err);
                });
            }
            
        }else{}
    
}
    next();
}