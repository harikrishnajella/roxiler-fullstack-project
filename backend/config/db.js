const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite')
const path = require('path');

const dbPath = path.join(__dirname, '../roxiler_systems.db')

const initializeDB = async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        // Create tables if they don't exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            address TEXT,
            password TEXT,
            role TEXT CHECK(role IN ('admin', 'user', 'store_owner')) DEFAULT 'user',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            address TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            store_id INTEGER NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
           )
       `)
       console.log('Sqlite database connected successfully...')
       return db;
    } catch (e) {
        console.log(`DB error: ${e.message}`)
        process.exit(1);
    }
}


module.exports = initializeDB();