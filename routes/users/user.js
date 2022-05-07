
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



const router = Router();

//User Login and Signup
router.get('/signup', signup_Get)
router.post('/signup',validateSignupInput,signup_Post)
router.get('/login', login_Get)
router.post('/login',validateLoginInput,login_Post)//
router.get('/logout', logout)

//Passwords
router.get('/forgot-password',(req, res)=>{res.render('passwords/forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset-password',setNewPassword)


router.get('/info', requireAuth,AppInfo)
router.get('/info/:appid', requireAuth,AppInfo)
router.post('/info/:appid', requireAuth,ReportApp,AddComment,AddRate)
router.get('/comments/:id', requireAuth, HandleLoadAllCommnets)
router.get('/download/:id', requireAuth, DownloadApp)


module.exports = router;