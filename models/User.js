const db = require('../db/database')

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
    console.log("from find email " + result[0]["user_id"]);
    return result;
  }
  static async findByID(id) {
    const sql = `SELECT * FROM user WHERE user_id='${id}';`;
    const [result, _] = await db.execute(sql);
    return result[0];
  }

  static async login(name, password) {
    const sql = `SELECT * FROM user WHERE name='${name}' AND password= ${password};`;
    try {
      const [result, _] = await db.execute(sql);
      return JSON.stringify(result[0]["user_id"]);
    } catch (err) {
      console.log(err)
    }
  }
}


module.exports = User;