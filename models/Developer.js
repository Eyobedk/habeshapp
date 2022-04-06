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
    console.log(this.name);
    console.log(this.phone);
    console.log(this.domain);
    console.log(this.email);
    console.log(this.password);
    console.log(this.payment_ID);
    try {
      let sql = `INSERT INTO developer(dev_name,dev_phone,dev_email,dev_password,dev_domain,dev_ban_status,payement_ID) 
    VALUES ('${this.name}',${this.phone},'${this.email}','${this.password}','${this.domain}',0,'${this.payment_ID}');`;
      return new Promise((resolve, reject) => {
        resolve(db.execute(sql));
      })
    } catch (err) { console.log(err) };
  }

  static async findEmail(email) {
    const sql = `SELECT * FROM developer WHERE dev_email='${email}';`;
    const [result, _] = await db.execute(sql);
    console.log("me result" + result)
    if ((result) === undefined) return undefined;
    else {
      return result;
    }
  }

  static async findByID(id) {
    const sql = `SELECT * FROM user WHERE dev_id='${id}';`;
    const [result, _] = await db.execute(sql);
    return result[0];
  }

  static async login(email, password) {
    //   console.log(password)
    //   const getpassword = `SELECT password FROM user WHERE email= '${email}';`;
    //   const [passwResult, _] = await db.execute(getpassword);
    //   let EncryptedPass = JSON.stringify(passwResult[0]["password"]);
    //   console.log("password result "+ JSON.stringify(passwResult[0]["password"]))
    // //!
    //   bcrypt.compare(password, EncryptedPass).then(function(result) {
    //       console.log("v"+result);
    //   });

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

  static async saveFromGoogle(email) {
    const result = await this.findEmail(email);
    if (result) { return; };

    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;

    let sql = `INSERT INTO user(email,currentdate) 
    VALUES ('${email}','${date}');`;
    return new Promise((resolve, reject) => {
      resolve(db.execute(sql));
    })
  }
}


module.exports = Developer;