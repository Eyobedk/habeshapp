
const {Router} = require("express");

const {validateApp} = require('./middleware/validateApps');




const router = Router();

//Developer
router.get('/pannel',(req, res) => { res.render("developer/pannel",{email:res.locals.email})});
router.get('/publish',(req, res) => { res.render("developer/publish")});
router.post('/publish',validateApp,(req, res)=>{res.send("<h1> Apps page </h1>")});
router.get('/status',(req, res) => { res.render("developer/status")});

router.get('/apps',(req, res) => { res.render("developer/apps")});
router.get('/update',(req, res) => { res.render("developer/update")});
router.get('/appsUpdate',(req, res) => { res.render("developer/appls/appsUpdate")});
router.get('/deleteApps',(req, res) => { res.render("developer/appls/deleteApps")});


module.exports = router;