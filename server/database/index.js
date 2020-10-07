var mysql = require('mysql')

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
})

db.connect(err => {
    if (err)
        throw err
    else
        console.log('Connected!')
})

module.exports = db