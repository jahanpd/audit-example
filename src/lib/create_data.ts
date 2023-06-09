import * as db from './server/db';
import * as fs from 'fs';


export const save_data = () => {
    let query = `SELECT * FROM operations`
    const ops = db.db.prepare(query).all();
    const json = JSON.stringify(ops);
    fs.writeFile('sampledata.json', json, 'utf8', (err) => console.log("WRITE ERROR", err));
}
