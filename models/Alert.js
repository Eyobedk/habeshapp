const db = require('../db/database')


class AlertUser {
    constructor(message) {
        this.message = message;
    }
    static async checkThereIsaMessage() {
        const sql = `SELECT * FROM alertuser WHERE alertuserid = 200;`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }
    async Alert() {
        const sql = `INSERT INTO alertuser(alertuserid, message) VALUES(200, '${this.message}');`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }

    async AlertByUpdate() {
        const sql = `UPDATE alertuser SET message = '${this.message}' WHERE alertuserid = 200;`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }
     static async DeleteTheMessage() {
        const sql = `DELETE FROM alertuser WHERE alertuserid = 200;`;// 
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
      }
}

class AlertDevelopers extends AlertUser
{
    constructor(message) {
        super(message)
        this.message = message;
    }
    static async checkThereIsaMessage() {
        const sql = `SELECT * FROM aletdeveloper WHERE messageId = 200;`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }
    async Alert() {
        const sql = `INSERT INTO aletdeveloper(messageId, message) VALUES(200, '${this.message}');`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }

     async AlertByUpdate() {
        const sql = `UPDATE alertuser SET message = '${this.message}' WHERE alertuserid = 200;`; // 
        const [result, _] = await db.execute(sql).catch((err) => {
            console.log(err)
        });
        return result;
    }

     static async DeleteTheMessage() {
        const sql = `DELETE FROM aletdeveloper WHERE messageId = 200;`;// 
        const [result, _] = await db.execute(sql).catch((err)=>{console.log(err)});
        return result;
      }

}


module.exports = {AlertUser,AlertDevelopers}
