
const {Router} = require("express");

const {registerDeveloper,handleSuccess,dev_logout} = require('../controllers/dev_auth.js')
const {validateApp} = require('../middleware/validateApps');
const {validateDev} = require('../middleware/validateDeveloper');
const {protect} = require('../middleware/protectRoute');
const {Login_Dev} = require('../controllers/dev_auth');
const {varifydevEmail} = require('../controllers/dev-forgot-passowrd');

const router = Router();


//Developer Auth routes
router.get('/developer-register',(req, res)=>{res.render("login&signup/developer-register")})
router.post('/pay',validateDev,registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


router.get('/developer-login', (req, res)=>{res.render("login&signup/developer-login")})
router.post('/developer-login', Login_Dev)
router.get('/dev-logout', dev_logout)

router.get('/developer-forgot', (req, res)=>{res.render("passwords/developer-forgot")})
router.post('/developer-forgot',varifydevEmail)
router.get('/developer-reset', (req, res)=>{res.render("passwords/developer-reset")})


//normal dev routes
router.get('/pannel',protect,(req, res) => { res.render("developer/pannel",{email:res.locals.email})});
router.get('/publish',protect,(req, res) => { res.render("developer/publish")});
router.post('/publish',protect,validateApp,(req, res)=>{res.send("<h1> Apps page </h1>")});
router.get('/status',protect,(req, res) => { res.render("developer/status")});

router.get('/apps',protect,(req, res) => { res.render("developer/apps")});
router.get('/update',protect,(req, res) => { res.render("developer/update")});
router.get('/appsUpdate',protect,(req, res) => { res.render("developer/appls/appsUpdate")});
router.get('/deleteApps',protect,(req, res) => { res.render("developer/appls/deleteApps")});


module.exports = router;