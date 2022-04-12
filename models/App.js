const db = require('../db/database')
const bcrypt = require('bcrypt');


class Apps {
    constructor(appName, catagory, description, appLocation,
        icon, screenshots, backgroundImage) {
        this.appName = appName;
        this.catagory = catagory,
        this.description = description,
        this.appLocation = appLocation;
        this.icon = icon;
        this.screenshots = screenshots;
        this.backgroundImage = backgroundImage;
        //Don't forget to use published date when inserting
    }


    save() {
        console.log(this.appName);
        console.log(this.catagory);
        console.log(this.description);
        console.log(this.appLocation);
        console.log(this.icon);
        console.log(this.screenshots);
        console.log(this.backgroundImage);
        try {
            let sql = `INSERT INTO apps(appName,catagory,description,appLocation,icon,screenshots,backgroundImage,publishedDate) 
             VALUES ('${this.appName}','${this.catagory}','${this.description}','${this.appLocation}','${this.icon}',
            '${this.screenshots}','${this.backgroundImage}','${publishedDate}');`;
            return new Promise((resolve, reject) => {
                resolve(db.execute(sql));
            })
        } catch (err) {
            console.log(err)
        };
    }

}


module.exports = Apps;