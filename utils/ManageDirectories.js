const fs = require('fs');

exports.
createDirectories = (req, res,next) => {
    const {name,
        email,icon,
        apk,
        backImage,
        screenshots
    } = req.body;

    console.log(name)
    console.log(email)
    console.log(apk)
    const appDirectory = `/uploaded/${name}/`;
    const Screenshots = `${appDirectory}/screenshots`;
    const Background = `${appDirectory}/backImage`;
    const Icon = `${appDirectory}/Icon`;
    console.log(appDirectory+"app directory")
    if (!fs.existsSync(appDirectory)) {
        fs.mkdir(appDirectory, (err, path) => {
            if (err) {
                console.log("there is an error");
            }
            console.log("the a path" + path)
        });
        fs.mkdir(Screenshots, (err, path) => {
            if (err) {
                console.log("there is an error");
            }
            console.log("the s path" + path)
        });
        fs.mkdir(Background, (err, path) => {
            if (err) {
                console.log("there is an error");
            }
            console.log("the b path" + path)
        });
        fs.mkdir(Icon, (err, path) => {
            if (err) {
                console.log("there is an error");
            }
            console.log("the Icon path" + path)
        });
        
    } else {
        console.log("the directory exists")
       // return
        }
   
    console.log("here ")
    console.log(req.body.name)
    next();
}