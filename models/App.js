const db = require('../db/database')
const bcrypt = require('bcrypt');


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
        console.log("here")
        console.log(this.appName);
        console.log(this.catagory);
        console.log(this.description);
        console.log(this.appLocation);
        console.log(this.icon);
        console.log(this.screenshots);
        console.log(this.backgroundImage);
        console.log(this.dev_id)
        console.log("to here")




        // try {
        //     let sql = `INSERT INTO apps(appName,catagory,description,appLocation,icon,screenshots,backgroundImage,publishedDate,dev_id) 
        //      VALUES ('${this.appName}','${this.catagory}','${this.description}','${this.appLocation}','${this.icon}',
        //     '${this.screenshots}','${this.backgroundImage}','${publishedDate}''${this.dev_id});`;
        //     return new Promise((resolve, reject) => {
        //         resolve(db.execute(sql));
        //     })
        // } catch (err) {
        //     console.log(err)
        // };
    }

}


module.exports = Apps;