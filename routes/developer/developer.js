"use strict";
const {Router} = require("express");
const {LoadNews} = require('../../controllers/developer/LoadNews')
const {fileUploader,ListPublishedApp,ListPublishedAppTobeDeleted} = require('../../controllers/developer/PublishApp');
const {registerDeveloper,handleSuccess,dev_logout} = require('../../controllers/developer/dev_auth.js')
const {validateApp} = require('../../middleware/developer/validateApps');
const {validDevInput} = require('../../middleware/developer/validateDeveloper');
const {protect} = require('../../middleware/developer/protectRoute');
const {Login_Dev} = require('../../controllers/developer/dev_auth');
const {validatestatus} = require('../../middleware/developer/filevalidator')
const {deleteAppsRoute} = require('../../controllers/developer/deleteApps')
const {ListStatApps,getStatus} = require('../../controllers/developer/status')
const {updateApps} =require('../../controllers/developer/updateApp')
const {varifydevEmail,validateResetTokes,setDeveloperPassword} = require('../../controllers/developer/dev-forgot-passowrd');
const { ListApps } = require("../../models/App");

const router = Router();


//Developer Register routes
router.get('/developer-register',(req, res)=>{res.render("developer/Auth/developer-register")})
router.post('/pay',validDevInput,registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


//Developer Login routes
router.get('/developer-login', (req, res)=>{res.render("developer/Auth/developer-Login")})
router.post('/developer-login', Login_Dev)
router.get('/dev-logout', dev_logout)


//Developer Passwords routes
router.get('/developer-forgot', (req, res)=>{res.render("developer/Auth/developer-forgot")})
router.post('/developer-forgot',varifydevEmail)
router.get('/developer-reset/:id/:token',validateResetTokes)
router.post('/developer-reset', setDeveloperPassword)


//normal dev routes
router.get('/pannel',protect,LoadNews);//(req, res) => { res.render("developer/pannel",{email:res.locals.email})}

//publish
router.get('/publish',protect,(req, res) => { res.render("developer/publish")});
router.post('/publish',protect,validateApp,fileUploader);//

//update
router.get('/update/:id',protect,(req, res) => {res.render("developer/update")});
router.post('/update/:id',protect,validatestatus,updateApps);
router.get('/appsUpdate',protect,ListPublishedApp);

//delete
router.get('/deleteApps',protect,ListPublishedAppTobeDeleted);
router.get('/delete/:id',protect,deleteAppsRoute);

//status and apps
router.get('/status',protect,ListStatApps);
router.get('/status/:id',protect,getStatus);
router.get('/apps',protect,(req, res) => { res.render("developer/apps")});


module.exports = router;