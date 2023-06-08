import * as db from '$lib/server/db';

export const load = (async ( params ) => {
    let search = params.url.searchParams;
    console.log(search);
    let start = search.get("start")
    let end = search.get("end")
    let teams = JSON.parse(search.get("teams"))
    let consultant_include = JSON.parse(search.get("consultant_include"))
    let consultant_exclude = JSON.parse(search.get("consultant_exclude"))
    let procs_include = JSON.parse(search.get("procs_include"))
    let procs_exclude = JSON.parse(search.get("procs_exclude"))
    let urgency = JSON.parse(search.get("urgency"))

    let query = `
SELECT * FROM operations
WHERE
(date > ${new Date(start).valueOf()})
AND (date < ${new Date(end).valueOf()})
${teams.length > 0 ? "AND team in (" + teams.map((c) => c.value).join(",") + ")" : ""}
${consultant_include.length > 0 ? "AND consultant in (" + consultant_include.map((c) => c.value).join(",") + ")" : ""}
${consultant_exclude.length > 0 ? "AND consultant not in (" + consultant_exclude.map((c) => c.value).join(",") + ")" : ""}
${procs_exclude.length > 0 ? "AND proc_code not in (" + procs_exclude.map((c) => c.value).join(",") + ")" : ""}
${urgency.length > 0 ? "AND urgency in (" + urgency.map((c) => c.value).join(",") + ")" : ""}
`
    const ops = db.db.prepare(query).all();
    // console.log(ops)

    return {
        operations: ops
    };
});
