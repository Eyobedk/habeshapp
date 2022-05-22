const {Router} = require('express');
const {logMeIn, register} = require('../../controllers/admin/Login')
const {sendEmail} = require('../../controllers/admin/sendEmail')
const {resetAdminPassword} = require('../../controllers/admin/resetAdminPassword')
const {LoadUsersAndDevelopers} = require('../../controllers/admin/loadUsersandDevs')
const {ListofBadApps} = require('../../controllers/admin/listMaleciousApps')
const {deleteReportedApp} = require('../../controllers/admin/deleteReportedApp')
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








// Home panel

router.get('/admin200', LoadUsersAndDevelopers);

module.exports = router;