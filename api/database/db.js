const sqlite3 = require('sqlite3').verbose();
let db

function connectDB() {
    if (!db) {
        db = new sqlite3.Database('server.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the template database.');
        });
        db.get("PRAGMA foreign_keys = ON")
        db.get("PRAGMA page_size = 65535")
        db.get("PRAGMA cache_size = -1000000")
        db.get("PRAGMA synchronous = OFF")
    }
    return db
}

module.exports = connectDB()