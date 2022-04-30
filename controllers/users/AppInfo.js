const Apps = require('../../models/App')

const ApkInfo = [];


exports.AppInfo = async (req, res) => {
    const appId = req.query.app;
    // const userId = res.locals.user.id;

    await Apps.ListAppsForUsers(appId).then((result) => {
        ApkInfo.push([{ appname: result[0].appName},
            { dev_id: result[0].dev_id }, { Rate: result[0].appRate },
            { func1: result[0].funcOne }, {  func2: result[0].funcTwo },
            { func3: result[0].funcThree }, { func4: result[0].funcFour },
            {Icon: result[0].icon},
            { screenshot1: result[0].screenshotOne }, { screenshot2: result[0].screenshotTwo },
            { screenshot3: result[0].screenshotThree }, { screenshot4: result[0].screenshotFour },
        ])
    }).catch(err => {
        console.log(err)
    })
    res.render('users/appPage',{AppInfos:ApkInfo})
}