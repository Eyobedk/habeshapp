const {Router} = require('express');
const {logMeIn, register} = require('../../controllers/admin/Login')
const {requireAuthforAdmin} = require('../../middleware/auth')
const {Logout_Admin}= require('../../controllers/admin/Logout_Admin')
const {sendEmail, resetAdminPassword} = require('../../controllers/admin/sendEmail')
const {sendUrl} = require('../../controllers/admin/resetAdminPassword')
const {LoadUsersAndDevelopers,Homepage,LoadAllUsers,ThismonthPublished,ThisMonthNewUsers,ThisMonthNewDevs} = require('../../controllers/admin/loadUsersandDevs')
const {ListofBadApps} = require('../../controllers/admin/listMaleciousApps')
const {ListBadDevelopers} = require('../../controllers/admin/ListBadDevelopers')
const {BlackListDeveloper} = require('../../controllers/admin/BlackListDeveloper')
const {deleteReportedApp} = require('../../controllers/admin/deleteReportedApp');
const { AlertUser, DeleteAlert} = require('../../controllers/admin/alertUser');
const { AlertDeveloper, DeleteAlertofDev} = require('../../controllers/admin/alertDeveloper');
const router = Router();


router.get('/admin200/login', (req, res)=>{res.render('admin/Login')});
router.post('/admin200/login', logMeIn);
// router.get('/admin200/reg', register);

// WILL BE USED LETTER
router.get('/admin200/forgot', (req, res)=>{res.render('admin/forgot')});
router.post('/admin200/forgot', sendEmail);
router.get('/admin200/resetpass/:id/:token', sendUrl);//(req, res)=>{res.render('admin/reset')}
router.post('/admin200/resetpass/', resetAdminPassword);


router.get('/admin200/badApps',requireAuthforAdmin, ListofBadApps)
router.get('/admin200/removeApp/:id',requireAuthforAdmin, deleteReportedApp)
router.get('/admin200/badDevelopers', requireAuthforAdmin, ListBadDevelopers)
router.get('/banDev/:devID', requireAuthforAdmin, BlackListDeveloper)

//Routes to handle alerting, deleteing and rendering news for users
router.get('/admin200/alertUser',requireAuthforAdmin,  (req, res)=>{res.render('admin/Alert_User')})
router.post('/admin200/alertUser',requireAuthforAdmin, AlertUser)
router.post('/admin200/deleteAlert', requireAuthforAdmin, DeleteAlert)

router.get('/admin200/alertDev', requireAuthforAdmin, (req, res)=>{res.render('admin/Alert_Developer')})
router.post('/admin200/alertDev',requireAuthforAdmin, AlertDeveloper)
router.post('/admin200/deleteDevAlert',requireAuthforAdmin, DeleteAlertofDev)
router.get('/logout-Admin', Logout_Admin)

// Home panel

router.get('/admin200', requireAuthforAdmin, Homepage);//(req, res)=>{res.render('admin/pannel')}
router.get('/listofDevelopers', requireAuthforAdmin, LoadUsersAndDevelopers);
router.get('/ListofAllusers', requireAuthforAdmin, LoadAllUsers);
router.get('/ListofThismonthapps', requireAuthforAdmin, ThismonthPublished);
router.get('/ListofThismontUsers', requireAuthforAdmin, ThisMonthNewUsers);
router.get('/ThismonthnewDevs', requireAuthforAdmin, ThisMonthNewDevs);

module.exports = router;