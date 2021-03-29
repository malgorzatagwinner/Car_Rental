const DBSOURCE = "db.sqlite"
const db = require('better-sqlite3')(DBSOURCE);
var md5 = require('md5')
var fs = require('fs')

const sql = fs.readFileSync('./src/tabelki.sql').toString()
db.exec(sql)


module.exports = db

