var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
var fs = require('fs')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(fs.readFileSync('./src/tabelki.sql').toString(),
	(err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
            }
        });  
    }
});


module.exports = db

