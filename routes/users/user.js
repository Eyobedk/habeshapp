
const {Router} = require("express");

const {validateSignupInput,validateLoginInput}= require('../../middleware/users/inputValidator');
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../../controllers/users/UsersAuth');
const {AppInfo,AddRate,Referesh} = require('../../controllers/users/AppInfo')
const {AddComment} = require('../../middleware/users/comment')
const {forgot_password,validateAndSendLink,setNewPassword} = require('../../controllers/users/User-forgot-password');
const {requireAuth} = require('../../middleware/auth');
const {DownloadApp} = require('../../controllers/users/Downloader')
const {HandleLoadAllCommnets } = require("../../controllers/users/comment")
const {ReportApp } = require("../../controllers/users/Reports")
const {feedback } = require("../../controllers/users/feedback")
const {LoadDevApps } = require("../../controllers/users/LoadDevApps")
const {contViews } = require("../../controllers/developer/contViews")



const router = Router();

//User Login and Signup
router.get('/signup', signup_Get)
router.post('/signup',validateSignupInput,signup_Post)
router.get('/login', login_Get)
router.post('/login',validateLoginInput,login_Post)//
router.get('/logout', logout)

//Passwords
router.get('/forgot-password',(req, res)=>{res.render('users/forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset-password',setNewPassword)


router.get('/info', requireAuth,AppInfo)
router.get('/info/:appid', requireAuth,contViews,AppInfo)//
router.post('/info/:appid', requireAuth,ReportApp,AddComment)
router.get('/comments/:id', requireAuth, HandleLoadAllCommnets)
router.get('/download/:id', requireAuth, DownloadApp)
router.post('/feedback', requireAuth, feedback)
router.get('/info/rate/:appkid/:rateAmount', requireAuth, AddRate)
router.get('/info/developer_page/:devId', requireAuth, LoadDevApps)

module.exports = router;