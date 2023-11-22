const mysql = require("mysql2")
const dbConfig = {
    host: "localhost",
    port:  3306,
    user: "root",
    password: "ligma",
    database: "dromtorp",

}

const connection = mysql.createConnection(dbConfig)
connection.connect()
let sql = `SELECT * FROM elev`
connection.query(sql, (err, results)=>{
    if(!err){
        console.log("Data received from MySQL server")
        console.log(results);
        let data = JSON.stringify(results)
} else{console.log(err)}
}
)

