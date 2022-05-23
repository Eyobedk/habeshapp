const db = require('../db/database')
const bcrypt = require('bcrypt');


class Admin {
  constructor(email, password) {
      this.email = email,
      this.password = password;
  }


  async save() {
    const hash = bcrypt.hashSync(this.password, 12);
    try {
      let sql = `INSERT INTO admin(admin_email, admin_password) 
    VALUES ('${this.email}','${hash}');`;
      const result =  await db.execute(sql).catch((err)=>{console.log(err)});
      console.log("inserted")
      return result;
    } catch (err) { console.log(err) };
  }

  static async findEmail(email) {
    const sql = `SELECT * FROM admin WHERE admin_email='${email}';`;
    const [result, _] = await db.execute(sql);
    if ((result) === undefined) return undefined;
    else {
      return result;
    }
  }

  static async blackListDeveloper(theBadDevId) {
    const sql = `INSERT INTO baneddevelopers(developer_id) VALUES('${theBadDevId}');`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async AlertUser(messgae) {
    const sql = `INSERT INTO alertuser(alertuserid, message) VALUES(200, '${messgae}');`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async AlertDev(messgae) {
    const sql = `INSERT INTO aletdeveloper(messageId, message) VALUES(200, '${messgae}');`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async DeleteTheMessage() {
    const sql = `DELETE FROM alertuser WHERE alertuserid = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async DeleteTheMessagefDev() {
    const sql = `DELETE FROM aletdeveloper WHERE messageId = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async AlertUserByUpdate(messgae) {
    const sql = `UPDATE alertuser SET message = '${messgae}' WHERE alertuserid = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async AlertDevByUpdate(messgae) {
    const sql = `UPDATE aletdeveloper SET message = '${messgae}' WHERE messageId = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async checkThereIsaMessage() {
    const sql = `SELECT * FROM alertuser WHERE alertuserid = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async checkThereIsaMessageforDev() {
    const sql = `SELECT * FROM aletdeveloper WHERE messageId = 200;`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async ListUsers() {
    const sql = `SELECT * FROM habeshapp.user ORDER BY currentdate ASC;`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async ListofDevs() {
    const sql = `SELECT * FROM developer ORDER BY registeredDate DESC;`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async checkAppisBlackListed(id) {
    const sql = `SELECT * FROM blacklistedapps WHERE TheReportedAppID = ${id};`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async checkDeveloperIsBlackListed(id) {
    const sql = `SELECT * FROM baneddevelopers WHERE developer_id = ${id};`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async ListofReportedApps() {
    const sql = `SELECT * FROM blacklistedapps;`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async ListofBadDevelopers() {
    const sql = `SELECT * FROM developer WHERE dev_ban_status >= 2;`;
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async updateBanStatus(id)
  {
    const sql = `UPDATE habeshapp.developer SET dev_ban_status =${0} WHERE dev_id = ${id};`;
    await db.execute(sql).then((result)=>{
      console.log("admin result"+JSON.stringify(result))
    }).catch((err)=>{console.log(err)});
  }
  

  static async login(email, password) {


    const sql = `SELECT * FROM admin WHERE admin_email='${email}' AND admin_password= '${password}';`;
    try {
      const [result, _] = await db.execute(sql);
      console.log("result " + result[0])
      if (result[0] === undefined) { console.log("undefined"); return false; }
      return JSON.stringify(result[0]["admin_id"]);
    } catch (err) {
      console.log(err);
    }
  }
  static async updatePassword(id,passowrd)
  {
    const sql = `UPDATE habeshapp.admin SET admin_password ='${passowrd}' WHERE admin_id = ${id};`;
    await db.execute(sql).then((result)=>{
      console.log("admin result"+JSON.stringify(result))
    }).catch((err)=>{console.log(err)});
  }

}


module.exports = Admin;