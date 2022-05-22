const db = require('../db/database')
const bcrypt = require('bcrypt');


class Developer {
  constructor(name, phone, domain, email, password, payment_ID) {
    this.name = name;
    this.phone = phone,
      this.domain = domain,
      this.email = email,
      this.password = password;
    this.payment_ID = payment_ID;
  }


  save() {
    const hash = bcrypt.hashSync(this.password, 12);
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;
    try {
      let sql = `INSERT INTO developer(dev_name,dev_phone,dev_email,dev_password,dev_domain,dev_ban_status,payement_ID, registeredDate) 
    VALUES ('${this.name}',${this.phone},'${this.email}','${hash}','${this.domain}',0,'${this.payment_ID}', '${date}');`;
      return new Promise((resolve, reject) => {
        resolve(db.execute(sql));
      })
    } catch (err) { console.log(err) };
  }

  static async findEmail(email) {
    const sql = `SELECT * FROM developer WHERE dev_email='${email}';`;
    const [result, _] = await db.execute(sql);
    if ((result) === undefined) return undefined;
    else {
      return result;
    }
  }

  static async findByID(id) {
    const sql = `SELECT * FROM developer WHERE dev_id='${id}';`;
    const [result, _] = await db.execute(sql);
    return result[0];
  }

  static async login(email, password) {


    const sql = `SELECT * FROM developer WHERE dev_email='${email}' AND dev_password= '${password}';`;
    try {
      const [result, _] = await db.execute(sql);
      console.log("result " + result[0])
      if (result[0] === undefined) { console.log("undefined"); return false; }
      return JSON.stringify(result[0]["dev_id"]);
    } catch (err) {
      console.log(err);
    }
  }
  static async updatePassword(id,passowrd)
  {
    const sql = `UPDATE habeshapp.developer SET dev_password ='${passowrd}' WHERE dev_id = ${id};`;
    await db.execute(sql).then((result)=>{
      console.log("developer result"+JSON.stringify(result))
    }).catch((err)=>{console.log(err)});
  }
}


module.exports = Developer;