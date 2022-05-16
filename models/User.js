const db = require('../db/database')
const bcrypt = require('bcrypt');

class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;

    let sql = `INSERT INTO user(name,password,email,currentdate) 
    VALUES ('${this.username}','${this.password}','${this.email}','${date}');`;
    return new Promise((resolve, reject) => {
      resolve(db.execute(sql));
    })
  }

  static async findEmail(email) {
    const sql = `SELECT * FROM user WHERE email='${email}';`;
    const [result, _] = await db.execute(sql);
    return result;
  }
//}
  
  static async findByID(id) {
    const sql = `SELECT * FROM user WHERE user_id='${id}';`;
    const [result, _] = await db.execute(sql);
    return result[0];
  }

  static async login(email, password) {
  
    
    const sql = `SELECT * FROM user WHERE email='${email}' AND password= '${password}';`;
    try {
      const [result, _] = await db.execute(sql);
      console.log("result "+result[0])
      if(result[0]===undefined) {console.log("undefined");return false;}
      return JSON.stringify(result[0]["user_id"]);
    } catch (err) {
      console.log(err);
    }
  }

  static async saveFromGoogle(email) {
    const result = await this.findEmail(email);
    if(result.length > 0) {return;};

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
  static async updatePassword(id, password)
  {
    const hash = bcrypt.hashSync(password, 10);
    const sql = `UPDATE habeshapp.user SET password = '${hash}' WHERE user_id = ${id};`;
    await db.execute(sql).catch((err)=>{
      console.log("The Error");
      console.log(err.code);
      console.log(err.sql);
      console.log(err.sqlMessage);
    })
  }
  static async addFeedback(message, id)
  {
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;
    const sql = `INSERT INTO feedbacks(message, commenterId, commentedate) VALUES(${message}, ${id}, ${date});`
    return new Promise((resolve, reject) => {
      resolve(db.execute(sql));
    })
  }

}


module.exports = User;