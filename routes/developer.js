"use strict";
const {Router} = require("express");
const {fileUploader,ListPublishedApp,ListPublishedAppTobeDeleted} = require('../controllers/PublishApp');
const {registerDeveloper,handleSuccess,dev_logout} = require('../controllers/dev_auth.js')
const {validateApp} = require('../middleware/validateApps');
const {validDevInput} = require('../middleware/validateDeveloper');
const {protect} = require('../middleware/protectRoute');
const {Login_Dev} = require('../controllers/dev_auth');
const {validatestatus} = require('../middleware/filevalidator')
const {deleteAppsRoute} = require('../controllers/deleteApps')
const {updateApps,StoreUpdated} =require('../controllers/updateApp')
const {varifydevEmail,validateResetTokes,setDeveloperPassword} = require('../controllers/dev-forgot-passowrd');

const router = Router();


//Developer Register routes
router.get('/developer-register',(req, res)=>{res.render("login&signup/developer-register")})
router.post('/pay',validDevInput,registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


//Developer Login routes
router.get('/developer-login', (req, res)=>{res.render("login&signup/developer-login")})
router.post('/developer-login', Login_Dev)
router.get('/dev-logout', dev_logout)


//Developer Passwords routes
router.get('/developer-forgot', (req, res)=>{res.render("passwords/developer-forgot")})
router.post('/developer-forgot',varifydevEmail)
router.get('/developer-reset/:id/:token',validateResetTokes)
router.post('/developer-reset', setDeveloperPassword)


//normal dev routes
router.get('/pannel',protect,(req, res) => { res.render("developer/pannel",{email:res.locals.email})});
router.get('/publish',protect,(req, res) => { res.render("developer/publish")});
router.post('/publish',validateApp,fileUploader);//

router.get('/update/:id',protect,(req, res) => {res.render("developer/update")});
router.post('/update/:id',protect,validatestatus,updateApps);
router.get('/delete/:id',protect,deleteAppsRoute);

router.get('/appsUpdate',protect,ListPublishedApp);
router.get('/deleteApps',protect,ListPublishedAppTobeDeleted);

router.get('/status',protect,(req, res) => { res.render("developer/status")});
router.get('/apps',protect,(req, res) => { res.render("developer/apps")});


module.exports = router;