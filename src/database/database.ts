import sqlite3 from 'sqlite3';

const DBSOURCE = process.env.NODE_ENV === 'test' ? 'test.db.sqlite' : 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    db.run(
      `CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        CONSTRAINT email_unique UNIQUE (email)
      )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          if (DBSOURCE !== 'test.db.sqlite') {
            const insert = 'INSERT INTO users (name, email) VALUES (?,?)';
            db.run(insert, ['admin', 'admin@example.com']);
            db.run(insert, ['user', 'user@example.com']);
          }
        }
      }
    );
  }
});

export default db;