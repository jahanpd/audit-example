<script type="text/typescript">
    import { form, clusters } from '../../store.ts';
    export let data;

    const getCluster = (proc_code) => {
        let clist = [];
        for (const [k,v] of Object.entries($clusters)) {
            if (v.map((c) => c.value).includes(proc_code)) {
                clist.push(k)
            }
        }
        if (clist.length > 0) return clist.join(", ");
        return "Other"
    }

    const getMortality = (cluster, operations) => {
        let total = 0.0;
        let mortCount = 0.0;
        for (let op in operations) {
            let clist = getCluster(operations[op].proc_code);
            if (clist.includes(cluster)) {
                mortCount = mortCount + operations[op].Mortality
                total = total + 1.0;
            }
        }
        return mortCount / total
    }
    const getLOS = (cluster, operations) => {
        let total = 0.0;
        let LOS = 0.0;
        for (let op in operations) {
            let clist = getCluster(operations[op].proc_code);
            if (clist.includes(cluster)) {
                LOS = LOS + operations[op].LOS
                total = total + 1.0;
            }
        }
        return LOS / total
    }
    const getCount = (cluster, operations) => {
        let total = 0;
        for (let op in operations) {
            let clist = getCluster(operations[op].proc_code);
            if (clist.includes(cluster)) {
                total = total + 1;
            }
        }
        return total
    }

    const checkOther = (op) => {
            return $form.procs_include.map((c) => c == "all" ? [] : $clusters[c.value]).flat().map((c) => c.value).includes(op.proc_code)
    }




</script>

<div class="p-4 border border-black border-2">
    <table class="table-auto w-full text-left">
        <tr>
            <th>Procedure</th>
            <th>Count</th>
            <th>Mean LOS</th>
            <th>Mortality Rate</th>
        </tr>
        <tr>
            <td>All procedures</td>
            <td>{data.operations.length}</td>
            <td>{data.operations.reduce((acc, curr) => acc + curr.LOS, 0.0) / data.operations.length}</td>
            <td>{data.operations.reduce((acc, curr) => acc + curr.Mortality, 0.0) / data.operations.length}</td>
        </tr>
        {#each $form.procs_include as clus}
        <tr>
            <td>{clus.value}</td>
            <td>{getCount(clus.value, data.operations)}</td>
            <td>{getLOS(clus.value, data.operations)}</td>
            <td>{getMortality(clus.value, data.operations)}</td>
        </tr>
        {/each}
        {#if $form.procs_include.length > 0}
            <tr>
                <td>Other procedures</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.LOS), 0.0) / data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.Mortality), 0.0) / data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
            </tr>
        {/if}
    </table>
</div>

<div class="p-4">
    <div class="pb-2">
        <p class="text-2xl font-semibold">Raw Data</p>
    </div>
    <table class="table-auto w-full text-left">
    <tr>
        <th>URN</th>
        <th>Urgency</th>
        <th>Consultant</th>
        <th>Team</th>
        <th>Date</th>
        <th>Prodecure Codes</th>
        <th>Procedure Cluster</th>
        <th>LOS</th>
        <th>Mortality</th>
    </tr>

    {#each data.operations as op}
        <tr>
            <td>{op.urn}</td>
            <td>{op.urgency}</td>
            <td>{op.consultant}</td>
            <td>{op.team}</td>
            <td>{op.date}</td>
            <td>{op.proc_code}</td>
            <td>{getCluster(op.proc_code)}</td>
            <td>{op.LOS}</td>
            <td>{op.Mortality}</td>
        </tr>
    {/each}

    </table>
</div>
