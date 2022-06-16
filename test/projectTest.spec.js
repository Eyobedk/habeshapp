const {AppInfo} = require('../controllers/users/AppInfo');
const {StartDownload} = require('../controllers/users/Downloader');
const {ListStatApps} = require('../controllers/developer/status');
const {deleteAppsRoute} = require('../controllers/developer/deleteApps');
const {Mailer} = require('../utils/Mail');

const assert = require('assert');
const expect = require('chai').expect

//BDD

describe('Suite 1', ()=>{
    it('Published App Accesser should return App Name as a result',async function(){
        
    expect(await ListStatApps(4020)).to.be.equal('Ride')
    })
});

describe('Suite 2', ()=>{
    it('Get the filtered information about the app should return App properties as a result',async function(){
        
    expect(await AppInfo(116)).to.be.equal(116)
    })
});

describe('Suite 3', ()=>{
    it('SMTP Supported emailer should return sent account address as a result',async function(){
    expect(await Mailer('Eyobedkebede05@gmail.com', 'The sent Link')).to.be.equal('Eyobedkebede05@gmail.com')
    })
});
describe('Suite 4', ()=>{
    it('Download the Android APP should return The file address as a result',async function(){
    expect(await StartDownload(116)).to.be.equal('uploads/mount/e5017770791117aa4af6095144051bf9.apk')
    })
});
describe('Suite 5', ()=>{
    it('delete app of developer should return app row affected as a result',async function(){
    expect(await deleteAppsRoute(116, 4020)).to.be.equal('app row Affected')
    })
});
