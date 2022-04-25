const db = require('../db/database')

class Apps {
    constructor(appName, catagory, description, appLocation,
        icon, screenshots, backgroundImage,devId) {
        this.appName = appName;
        this.catagory = catagory,
        this.description = description,
        this.appLocation = appLocation;
        this.icon = icon;
        this.screenshots = screenshots;
        this.backgroundImage = backgroundImage;
        this.dev_id = devId;
        
    }


     save() {
        const d = new Date();
        const year = d.getFullYear();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const date = `${year}-${month}-${day}`;

        try {
            let sql = `INSERT INTO apps(appName,catagory,description,appLocation,icon,screenshotOne,screenshotTwo,screenshotThree,backgroundImage,publishedDate,dev_id) 
             VALUES ('${this.appName}','${this.catagory}','${this.description}','${this.appLocation}','${this.icon}',
            '${this.screenshots[0]}','${this.screenshots[1]}','${this.screenshots[2]}','${this.backgroundImage}','${date}',${this.dev_id});`;
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
    static async ListApps(id)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${id}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async getAppsPath(appid,id)
    {
        const sql = `SELECT * FROM apps WHERE dev_id=${id} AND appid=${appid}`;
        const [result, _] = await db.execute(sql);
        return result
    }
    static async updateApp(appid, publishedOn,appUrl)
    {
        try{
            console.log("updateApp")
            
            let sql = `INSERT INTO previousversions(appid, published_on,file_location) VALUES(${appid},'${publishedOn}', '${appUrl}');`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    static async UpdateTheAppTable(ApkLocation, screenshotsArray,newbackgroundImage,ApkID)
    {
        try{
            
            let sql = `UPDATE apps
            SET appLocation = '${ApkLocation}', screenshotOne = '${screenshotsArray[0]}', screenshotTwo = '${screenshotsArray[1]}',
            screenshotThree = '${screenshotsArray[2]}',backgroundImage = '${newbackgroundImage}' WHERE appid = ${ApkID};`
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        }
        catch (err) {
            console.log(err)
        }
    }

}


module.exports = Apps;