const {Router} = require("express");
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../controllers/auth');
const {forgot_password,validateAndSendLink,setNewPassword} = require('../controllers/forgot-password');
const router = Router();
const {requireAuth} = require('../middleware/auth');


router.get('/signup', signup_Get)
router.post('/signup', signup_Post)
router.get('/login', login_Get)
router.post('/login', login_Post)
router.get('/logout', logout)

router.get('/forgot-password',(req, res)=>{res.render('forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset_password',setNewPassword)

module.exports = router;