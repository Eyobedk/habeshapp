const {Apps,AppExplictActions} = require('../../models/App')
const {BlackList}  = require('../../models/Admin')
const {checkDownloadStatus} = require('../../controllers/users/process_Downloader')

exports.ReportApp = async (req, res,next)=>{
    const reported = req.body.report;
    const ExplictAppClass = new AppExplictActions(res.locals.userId,req.params.appid);
    // check if user have downloaded the app before it true process rating 
    const StatResult = await checkDownloadStatus(req.params.appid, res.locals.userId).catch((err) => {
        console.log(err)
    })

    let avarageReport;

    if(reported){
        if (StatResult.length != 0) {
        const ReportedList = await ExplictAppClass.checkAppisReported();
        if(ReportedList.length == 0)
        {
            await AppExplictActions.ReportApp(req.params.appid) //updates the app table by making repot  
            await ExplictAppClass.InserttoReporteds()//insert into reports tablle by passng the userid and app id

            const [RatesandDownloads, _] = await AppExplictActions.GetReportandDownload(req.params.appid);
            avarageReport = parseFloat(RatesandDownloads.downloads / RatesandDownloads.appReports);
            const FoundAppIdfromBlackList = await BlackList.checkAppisBlackListed(req.params.appid);
            // console.log()
            if(RatesandDownloads.appReports >= avarageReport)
            {
                if(!FoundAppIdfromBlackList.length)
                {
                    await AppExplictActions.AddtoblackListAppsTable(RatesandDownloads.icon, RatesandDownloads.appName, RatesandDownloads.appReports, req.params.appid).catch((err)=>{
                    console.log(err);
                    });
                    await AppExplictActions.updateStatus(RatesandDownloads.dev_id).catch((err)=>{console.log(err)})
                }
            }
            
        } }
        else{}
    res.redirect('back')
}
    // next();
}