const mysql= require('mysql2')

const dbConfig={
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'crud_uade'
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err)=>{
    if(err){
        console.log("Failed to connect")
        return
    }
    console.log("Connection established")
})

module.exports = connection