
const {Router} = require("express");

const {registerDeveloper,handleSuccess,dev_logout} = require('../controllers/dev_auth.js')
const {validateApp} = require('../middleware/validateApps');
const {Login_Dev} = require('../controllers/dev_auth');

const router = Router();


//Developer Auth routes
router.get('/developer-register',(req, res)=>{res.render("login&signup/developer-register")})
router.post('/pay',registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


router.get('/developer-login', (req, res)=>{res.render("login&signup/developer-login")})
router.post('/developer-login', Login_Dev)
router.post('/dev-logout', dev_logout)
router.get('/developer-forgot', (req, res)=>{res.render("passwords/developer-forgot")})
router.get('/developer-reset', (req, res)=>{res.render("passwords/developer-reset")})


//normal dev routes
router.get('/pannel',(req, res) => { res.render("developer/pannel",{email:res.locals.email})});
router.get('/publish',(req, res) => { res.render("developer/publish")});
router.post('/publish',validateApp,(req, res)=>{res.send("<h1> Apps page </h1>")});
router.get('/status',(req, res) => { res.render("developer/status")});

router.get('/apps',(req, res) => { res.render("developer/apps")});
router.get('/update',(req, res) => { res.render("developer/update")});
router.get('/appsUpdate',(req, res) => { res.render("developer/appls/appsUpdate")});
router.get('/deleteApps',(req, res) => { res.render("developer/appls/deleteApps")});


module.exports = router;