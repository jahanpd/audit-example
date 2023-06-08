import Database from 'better-sqlite3';
export const db = new Database('lollipop.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

console.log("db loaded")
