"use strict";

const {Apps,AppExplictActions} = require('../../models/App')
const {checkDownloadStatus} = require('../../controllers/users/process_Downloader')
const {
    checkAppRated,
    Rate1star,
    Rate2star,
    Rate3star,
    Rate4star,
    Rate5star,
    insertRate,
    checkRateStatus,
    addUserId,
    updateMyRate,
    SetRate
} = require('./Rate')

var sum = 0;
var total = 0;



async function handleRating(appId, amount) {
    if (amount == 1) {
        await Rate1star(appId)
    }
    if (amount == 2) {
        await Rate2star(appId)
    }
    if (amount == 3) {
        await Rate3star(appId)
    }
    if (amount == 4) {
        await Rate4star(appId)
    }
    if (amount == 5) {
        await Rate5star(appId)
    }
}

async function performRate(theStarts) {
    let keyvalue = {
        '1': theStarts[0].oneStar,
        '2': theStarts[0].twoStar,
        '3': theStarts[0].threeStar,
        '4': theStarts[0].fourStar,
        '5': theStarts[0].fiveStar
    };

    for (const key in keyvalue) {
        total += keyvalue[key];
        sum += keyvalue[key] * parseInt(key)
    }
    return Math.round(sum / total);
}



exports.AppInfo = async (req, res) => {
    const appIds = req.params.appid;
    let ApkInfo = [];
    let similarAppsList = [];
    let oldversionsDates = [];
    let catagory;
    // const AppClass = new AppExplictActions(appIds)

    await AppExplictActions.ListApps(appIds).then((result) => {
        ApkInfo.push([{
                appname: result[0].appName
            }, {
                dev_id: result[0].dev_id
            },
            {
                Rate: result[0].appRate
            }, {
                func1: result[0].funcOne
            },
            {
                func2: result[0].funcTwo
            }, {
                func3: result[0].funcThree
            },
            {
                func4: result[0].funcFour
            }, {
                Icon: '/' + result[0].icon
            },
            {
                screenshot1: '/' + result[0].screenshotOne
            },
            {
                screenshot2: '/' + result[0].screenshotTwo
            },
            {
                screenshot3: '/' + result[0].screenshotThree
            },
            {
                app_id: result[0].appid
            },
            {
                descriptions: result[0].description
            },
            {
                downloads: result[0].downloads
            }
        ])
        catagory = result[0].catagory;
    }).catch(err => {
        console.log(err)
    }).then(async () => {
        const SimilarApps = await Apps.SimilarApps(catagory);
        for (let i = 0; i < SimilarApps.length; i++) {
            similarAppsList.push([

                {
                    name: SimilarApps[i].appName.replace(/[_]+/g, ' ')
                },
                {
                    icon: SimilarApps[i].icon
                },
                {
                    rate: SimilarApps[i].appRate
                },
                {
                    id: SimilarApps[i].appid
                }
            ])
        }

        const HasOldVersion= await Apps.oldversion(appIds);

        for(let j=0; j < HasOldVersion.length; j++)
        {
            let theDate = HasOldVersion[j].published_on
            let month = theDate.getUTCMonth() +1;
             let day = theDate.getUTCDate() + 1;
             console.log(day)
             console.log(month)

            if(parseInt(day) < 10){
                day = '0' + day;
            }
            if(parseInt(month) < 10){
                month ='0' + month;
            }

            console.log(day)
            console.log(month)

            let year = theDate.getUTCFullYear();
            let newdate = `${year}-${month}-${day}`;
            console.log(`here ${newdate}`)

            oldversionsDates.push({
                date: newdate
            })
        }
        console.log(oldversionsDates)
        
        res.render('users/appPage', {
            AppInfos: ApkInfo,
            similarApks: similarAppsList,
            oldates : oldversionsDates
        });
    })
}

exports.AddRate = async (req, res) => {

    const apkId = req.params.appkid;
    const RateAmount = req.params.rateAmount;
    if (RateAmount > 5) {
        res.redirect('back')
    }

    const StatResult = await checkDownloadStatus(apkId, res.locals.userId).catch((err) => {
        console.log(err)
    })// check if user have downloaded the app before it true process rating 
    if (StatResult.length == 0) {
        await checkAppRated(apkId).then(async appResult => {  //check if app hasbeen rated before 
            if (appResult.length == 0) {
                await insertRate(apkId).then(async () => { // create a row in the rate table for the specified application 
                    Promise.resolve(await handleRating(apkId, RateAmount)).then(async () => {  //preocess the rating by passing the app id with the rarte amount
                        await addUserId(apkId, res.locals.userId)// insert the user and app id into the already rated table
                    }).then(
                        await updateMyRate(apkId).then(async theStarts => {// get the app from rate table 
                            await performRate(theStarts).then(result => {
                                SetRate(result, apkId)// finally set the rate value into the app row
                            })
                        })
                    )
                })
            } else {
                await checkRateStatus(apkId, res.locals.userId).then(async StatResult => { //check user rated the app  ?
                    if (StatResult.length == 0) {
                        await insertRate(apkId).then(async () => {//// create a row in the rate table for the specified application 
                            Promise.resolve(await handleRating(apkId, RateAmount)).then(async () => {   //preocess the rating by passing the app id with the rarte amount
                                await addUserId(apkId, res.locals.userId)//// insert the user and app id into the already rated table
                            }).then(
                                await updateMyRate(apkId).then(async theStarts => {// get the app from rate table 
                                    await performRate(theStarts).then(result => {
                                        SetRate(result, apkId)// finally set the rate value into the app row
                                    })
                                })

                            )
                        })
                    }
                })
            }
        })
    }
    res.redirect('back');
}



// async function AppInfo (id, res) {
//     const appIds =id
//     let ApkInfo = [];
//     let similarAppsList = [];
//     let oldversionsDates = [];
//     let catagory;

//     await Apps.ListAppsForUsers(appIds).then((result) => {
//         ApkInfo.push([{
//                 appname: result[0].appName
//             }, {
//                 dev_id: result[0].dev_id
//             },
//             {
//                 Rate: result[0].appRate
//             }, {
//                 func1: result[0].funcOne
//             },
//             {
//                 func2: result[0].funcTwo
//             }, {
//                 func3: result[0].funcThree
//             },
//             {
//                 func4: result[0].funcFour
//             }, {
//                 Icon: '/' + result[0].icon
//             },
//             {
//                 screenshot1: '/' + result[0].screenshotOne
//             },
//             {
//                 screenshot2: '/' + result[0].screenshotTwo
//             },
//             {
//                 screenshot3: '/' + result[0].screenshotThree
//             },
//             {
//                 app_id: result[0].appid
//             },
//             {
//                 descriptions: result[0].description
//             },
//             {
//                 downloads: result[0].downloads
//             }
//         ])
//         catagory = result[0].catagory;
//     }).catch(err => {
//         console.log(err)
//     })
//     console.log(ApkInfo[0][0].appname)
    
//     // .then(async () => {
//     //     const SimilarApps = await Apps.SimilarApps(catagory);
//     //     for (let i = 0; i < SimilarApps.length; i++) {
//     //         similarAppsList.push([

//     //             {
//     //                 name: SimilarApps[i].appName.replace(/[_]+/g, ' ')
//     //             },
//     //             {
//     //                 icon: SimilarApps[i].icon
//     //             },
//     //             {
//     //                 rate: SimilarApps[i].appRate
//     //             },
//     //             {
//     //                 id: SimilarApps[i].appid
//     //             }
//     //         ])
//     //     }

//     //     const HasOldVersion= await Apps.oldversion(appIds);

//     //     for(let j=0; j < HasOldVersion.length; j++)
//     //     {
//     //         let theDate = HasOldVersion[j].published_on
//     //         let month = theDate.getUTCMonth() +1;
//     //          let day = theDate.getUTCDate() + 1;
//     //          console.log(day)
//     //          console.log(month)

//     //         if(parseInt(day) < 10){
//     //             day = '0' + day;
//     //         }
//     //         if(parseInt(month) < 10){
//     //             month ='0' + month;
//     //         }

//     //         console.log(day)
//     //         console.log(month)

//     //         let year = theDate.getUTCFullYear();
//     //         let newdate = `${year}-${month}-${day}`;
//     //         console.log(`here ${newdate}`)

//     //         oldversionsDates.push({
//     //             date: newdate
//     //         })
//     //     }
//     //     console.log(oldversionsDates)
        
//     // })
//     return ApkInfo[0][11].app_id;
// }

// module.exports = {AppInfo};

// similarApks: similarAppsList,
// oldates : oldversionsDates