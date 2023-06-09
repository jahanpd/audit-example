import Database from 'better-sqlite3';

export const db = new Database(':memory:', { verbose: console.log });
db.pragma('journal_mode = WAL');


db.table('operations', {
  columns: ['urn', 'proc_code', 'date', 'team', 'consultant', 'urgency', 'LOS', 'Mortality'],
  rows: function* () {
    for (let i=1; i < (224*20); i += 1) {
        let urn = i;
        let proc_code = Math.floor(Math.random() * 6) + 1;
        let dateobj = new Date((Date.now() + (1000*60*60*24*112)) - Math.floor(Math.random() * (1000*60*60*24*224)))
        let date = dateobj.valueOf();
        let team = Math.floor(Math.random() * 4) + 1;
        let consultant = Math.floor(Math.random() * 4) + 1;
        let urgency = Math.floor(Math.random() * 2) + 1;
        let LOS = Math.floor(Math.random() * 10) + 1;
        let Mortality = (Math.random() > 0.95) ? 1 : 0;
      yield { urn, proc_code, date, team, consultant, urgency, LOS, Mortality };
    }
  },
});
