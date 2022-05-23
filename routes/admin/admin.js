const {Router} = require('express');
const {logMeIn, register} = require('../../controllers/admin/Login')
const {sendEmail} = require('../../controllers/admin/sendEmail')
const {resetAdminPassword} = require('../../controllers/admin/resetAdminPassword')
const {LoadUsersAndDevelopers} = require('../../controllers/admin/loadUsersandDevs')
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
// router.get('/admin200/forgot', (req, res)=>{res.render('admin/forgot')});
// router.post('/admin200/forgot', sendEmail);
// router.get('/admin200/reset/:id/:token', (req, res)=>{res.render('admin/reset')});
// router.post('/admin200/reset/', resetAdminPassword);


router.get('/admin200/badApps', ListofBadApps)
router.get('/admin200/removeApp/:id', deleteReportedApp)
router.get('/admin200/badDevelopers', ListBadDevelopers)
router.get('/banDev/:devID', BlackListDeveloper)

router.get('/admin200/alertUser', (req, res)=>{res.render('admin/alertUser')})
router.post('/admin200/alertUser', AlertUser)
router.post('/admin200/deleteAlert', DeleteAlert)

router.get('/admin200/alertDev', (req, res)=>{res.render('admin/alertDev')})
router.post('/admin200/alertDev', AlertDeveloper)
router.post('/admin200/deleteDevAlert', DeleteAlertofDev)







// Home panel

router.get('/admin200', LoadUsersAndDevelopers);

module.exports = router;