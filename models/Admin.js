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
  static async findByID(id) {
    const sql = `SELECT * FROM admin WHERE admin_id='${id}';`;
    const [result, _] = await db.execute(sql);
    return result[0];
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
  static async updatePassword(id=1010,passowrd)
  {
    const sql = `UPDATE habeshapp.admin SET admin_password ='${passowrd}' WHERE admin_id = ${id};`;
    await db.execute(sql).then((result)=>{
      console.log("admin result"+JSON.stringify(result))
    }).catch((err)=>{console.log(err)});
  }
  static async LoadAllReactions()
    {
        const sql = `SELECT user.name, feedbacks.message,feedbacks.commentedate FROM user, 
        feedbacks WHERE user.user_id = feedbacks.commenterId ORDER BY feedbacks.commentedate DESC; `;
        const [orderedComments, _] = await db.execute(sql);
        return orderedComments;
    }
  static async AppsInThismonth()
    {
      const d = new Date();
      const Thismonth = d.toLocaleString('default', { month: 'long' });
      console.log(Thismonth);
        const sql = `select * from apps where monthname(publishedDate)='${Thismonth}';`;
        const [AppsfromThismonth, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        console.log(JSON.stringify(AppsfromThismonth))
        return AppsfromThismonth;
    }
  static async UsersInThismonth()
    {
      const d = new Date();
      const Thismonth = d.toLocaleString('default', { month: 'long' });
      console.log(Thismonth);
        const sql = `select * from user where monthname(currentdate)='${Thismonth}';`;
        const [AppsfromThismonth, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        console.log(JSON.stringify(AppsfromThismonth))
        return AppsfromThismonth;
    }

}

class BlackList extends Admin{
  constructor(developer){
    super(developer)
    this.devId = developer;
  }
   async blackListDeveloper() {
    const sql = `INSERT INTO baneddevelopers(developer_id) VALUES('${this.devId}');`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async checkAppisBlackListed(Appid) {
    const sql = `SELECT * FROM blacklistedapps WHERE TheReportedAppID = ${Appid};`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
   async checkDeveloperIsBlackListed() {
    const sql = `SELECT * FROM baneddevelopers WHERE developer_id = ${this.devId};`;// 
    const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
    return result;
  }
  static async ListofReportedApps() {
    const sql = `SELECT * FROM blacklistedapps;`;// 
    const [result, _] = await db.execute(sql);
    return result;
  }
  static async UsersInThismonth()
    {
      const d = new Date();
      const Thismonth = d.toLocaleString('default', { month: 'long' });
      const sql = `select * from developer where monthname(registeredDate)='${Thismonth}';`;
      const [devsfromThismonth, _] = await db.execute(sql).catch((err)=>{console.log(err)});
      console.log(JSON.stringify(devsfromThismonth))
      return devsfromThismonth;
    }
   async updateBanStatus()
    {
      const sql = `UPDATE habeshapp.developer SET dev_ban_status =${0} WHERE dev_id = ${this.devId};`;
      await db.execute(sql).then((result)=>{
        console.log("admin result"+JSON.stringify(result))
      }).catch((err)=>{console.log(err)});
    }
}


module.exports = {BlackList, Admin};