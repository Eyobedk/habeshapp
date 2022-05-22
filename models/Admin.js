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
  static async ListofReportedApps() {
    const sql = `SELECT * FROM blacklistedapps;`;// 
    const [result, _] = await db.execute(sql);
    return result;
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