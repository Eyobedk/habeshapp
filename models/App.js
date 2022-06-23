const db = require('../db/database')

class Apps {
    constructor(appName, catagory, description, appLocation,
        icon, screenshots,devId,functOne,functTwo,functThree,functFour) {
        this.appName = appName;
        this.catagory = catagory,
        this.description = description,
        this.appLocation = appLocation;
        this.icon = icon;
        this.screenshots = screenshots;
        this.dev_id = devId;
        this.funcOne = functOne,
        this.funcTwo = functTwo,
        this.funcThree = functThree,
        this.funcfour = functFour
        
    }


     save() {
        const d = new Date();
        const year = d.getFullYear();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const date = `${year}-${month}-${day}`;

        try {
            let sql = `INSERT INTO apps(appName,catagory,description,appLocation,icon,screenshotOne,screenshotTwo,screenshotThree,publishedDate,dev_id,
                funcOne,funcTwo,funcThree,funcFour) 
             VALUES ('${this.appName.replace(/[ ]+/g, '_')}','${this.catagory}','${this.description.replace(/[']+/g, '')}','${this.appLocation}','${this.icon}',
            '${this.screenshots[0]}','${this.screenshots[1]}','${this.screenshots[2]}','${date}',${this.dev_id},'${this.funcOne}',
            '${this.funcTwo}','${this.funcThree}','${this.funcfour}');`;
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        } catch (err) {
            console.log(err)
        };
    }
    static async find(name)
    {
        const sql = `SELECT * FROM apps WHERE appName='${name}';`;
        const [result, _] = await db.execute(sql);
        return result[0];
    }
     static async oldversion(TheAppId)
    {
        const sql = `SELECT * FROM habeshapp.previousversions WHERE appid=${TheAppId};`;
        const [result, _] = await db.execute(sql);
        return result;
    }
     static async ListApps(TheAppId)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${TheAppId}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async SimilarApps(catagory)
    {
        const sql = `SELECT * FROM apps WHERE catagory = '${catagory}'`;
        const [result, _] = await db.execute(sql);
        return result
    }

    static async getAppsPath(appid,id)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${id} AND appid=${appid}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async getAppsPathById(TheAppId)
    {
        const sql = `SELECT * FROM apps WHERE  appid=${TheAppId}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async updateApp(appid, publishedOn,appUrl)
    {
        try{            
            let sql = `INSERT INTO previousversions(appid, published_on,file_location) VALUES(${appid},'${publishedOn}', '${appUrl}');`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    static async UpdateTheAppTable(ApkLocation, description, screenshotsArray,ApkID,funcOne,funcTwo,funcThree,funcFour)
    {
        const d = new Date();
        const year = d.getFullYear();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const updatedDate = `${year}-${month}-${day}`;
        try{
            
            let sql = `UPDATE apps
            SET description = '${description}', appLocation = '${ApkLocation}', screenshotOne = '${screenshotsArray[0]}', screenshotTwo = '${screenshotsArray[1]}',
            screenshotThree = '${screenshotsArray[2]}',publishedDate = '${updatedDate}',funcOne = '${funcOne}',
            funcTwo = '${funcTwo}',funcThree = '${funcThree}',funcFour = '${funcFour}' WHERE appid = ${ApkID};`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    
    static async LoadNewApps()
    {
        const sql = `SELECT * FROM apps ORDER BY publishedDate ASC`;
        const [orderedResult, _] = await db.execute(sql);
        return orderedResult;
    }
    static async LoadAllCommnets(TheAppId)
    {
        const sql = `SELECT user.name, comments.commentOne,comments.commentTwo FROM user, 
        comments WHERE user.user_id = comments.user_id AND commentedappid = ${TheAppId} ORDER BY comments.published_date ASC; `;
        const [orderedComments, _] = await db.execute(sql);
        return orderedComments;
    }

    static async Download(TheAppId)
    {
        const sql = `SELECT appLocation FROM apps where appid = ${TheAppId}`;
        const result = await db.execute(sql);
        return result[0][0].appLocation;
    }
    static async DownloadVersion(app_id,date)
    {
        console.log(date, app_id)
        const sql = `SELECT file_location FROM previousversions where published_on like '%${date}%' AND appid = ${app_id};`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        console.log(result);
        return result[0].file_location;
    }
    static async SearchApp(appName)
    {
        const sql = `SELECT * FROM apps where appName like '%${appName}%';`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }

    static async GetAlreadyVistedId(viewer_id, viewedapp_id,res)
    {
        const sql = `SELECT * FROM viewerstable WHERE theviwer_id = ${viewer_id} AND theviwed_app_id = ${viewedapp_id}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err);
            if(err.errno == 1054)
            {
                res.redirect(302,'/logout');
            }});
        return result;
    }
    static async UpdateAlreadyVistedId(viewer_id, viewedapp_id,res)
    {
       
        const sql = `INSERT INTO viewerstable(theviwer_id, theviwed_app_id) VALUES(${viewer_id}, ${viewedapp_id})`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err);
            if(err.errno == 1452)
            {
                res.redirect(302,'/home');
            }});
        return result;
        
    }
    static async updateViewCount(TheAppId)
    {
        const sql = `UPDATE apps SET views = views + 1 WHERE appid = ${TheAppId}`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
}

class AppExplictActions extends Apps
{
    constructor(sysUser_Id, app_id)
    {
        super(sysUser_Id, app_id)
        this.sysUser_Id = sysUser_Id,
        this.app_Id = app_id
    }

     async checkAppisReported()
    {
        const sql = `SELECT * FROM alreadyreported where reported_appid = ${this.app_Id} AND reporter_id = ${this.sysUser_Id}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async GetReportandDownload(TheAppId)
    {
        const sql = `SELECT icon, appName, downloads,appReports,dev_id FROM apps where appid = ${TheAppId}`;
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
    }
    static async ReportApp(TheAppId)
    {
        const sql = `UPDATE apps SET appReports = appReports + 1 WHERE appid = ${TheAppId}`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
    static async updateStatus(dev_id)
    {
        const sql = `UPDATE developer SET dev_ban_status = dev_ban_status + 1 WHERE dev_id = ${dev_id}`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
     async InserttoReporteds()
    {
        const sql = `INSERT INTO alreadyreported(reporter_id, reported_appid) VALUES(${this.sysUser_Id}, ${this.app_Id})`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
    static async AddtoblackListAppsTable(Icon, Appname, Reports, appId)
    {
        const sql = `INSERT INTO blacklistedapps(Theicon, TheAppName, ReportedAmount, TheReportedAppID)
         VALUES('${Icon}', '${Appname}', ${Reports}, ${appId})`;
        return new Promise((resolve, reject) => {
            resolve(db.execute(sql));
        })
    }
     async deleteApps()
    {
        const sql = `DELETE FROM apps where appid = ${this.app_Id} AND dev_id =${this.sysUser_Id};`
        const delResult = await db.execute(sql);
        return delResult
    }
    static async deleteAppsByAdmin(TheAppId)
    {
        const sql = `DELETE FROM apps where appid = ${TheAppId};`
        const delResult = await db.execute(sql);
        return delResult
    }
    //Listapps method is overriding from apps to execute the save operation for different Actor
   static async ListApps(TheAppId)
    {
        const sql = `SELECT * FROM apps WHERE appid=${TheAppId}`;
        const [result, _] = await db.execute(sql);
        return result
    }
}

module.exports = {Apps,AppExplictActions};

// module.exports = Apps;