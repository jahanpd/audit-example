<script type="text/typescript">
    import { form, clusters } from '../../store.ts';
 import { Bar } from 'svelte-chartjs';
 export let data;

 import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  Chart.register(
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
  );

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

    const getCountBarData = (operations, historical) => {
        let start = new Date($form.start)
        let end =  new Date($form.end)
        let diff = end.valueOf() - start.valueOf()


        return {
            labels: [
                `${new Date(start.valueOf() - 4*diff).toLocaleString().slice(0,10)} - ${new Date(start.valueOf() - 3*diff).toLocaleString().slice(0,10)}`,
                `${new Date(start.valueOf() - 3*diff).toLocaleString().slice(0,10)} - ${new Date(start.valueOf() - 2*diff).toLocaleString().slice(0,10)}`,
                `${new Date(start.valueOf() - 2*diff).toLocaleString().slice(0,10)} - ${new Date(start.valueOf() - 1*diff).toLocaleString().slice(0,10)}`,
                `${new Date(start.valueOf() - 1*diff).toLocaleString().slice(0,10)} - ${new Date(start.valueOf() - 0*diff).toLocaleString().slice(0,10)}`,
                `${start.toLocaleString().slice(0,10)} - ${end.toLocaleString().slice(0,10)}`
            ],
            datasets: [
                {
                    label: 'count',
                    data: [
                        data.historical.filter((c) => c.date > (start.valueOf() - 4*diff) && c.date < (start.valueOf() - 3*diff)).length,
                        data.historical.filter((c) => c.date > (start.valueOf() - 3*diff) && c.date < (start.valueOf() - 2*diff)).length,
                        data.historical.filter((c) => c.date > (start.valueOf() - 2*diff) && c.date < (start.valueOf() - 1*diff)).length,
                        data.historical.filter((c) => c.date > (start.valueOf() - 1*diff) && c.date < (start.valueOf() - 0*diff)).length,
                        data.operations.length
                    ]
                }
            ]
        }
    }



</script>

<div class="flex flex-col p-4 border border-black border-2 items-center">
    <table class="table-auto w-full text-left">
        <tr>
            <th>Procedure</th>
            <th>Count</th>
            <th>Mean LOS</th>
            <th>Historical LOS</th>
            <th>Mortality Rate</th>
            <th>Historical Mortality Rate</th>
        </tr>
        <tr>
            <td>All procedures</td>
            <td>{data.operations.length}</td>
            <td>{data.operations.reduce((acc, curr) => acc + curr.LOS, 0.0) / data.operations.length}</td>
            <td>{data.historical.reduce((acc, curr) => acc + curr.LOS, 0.0) / data.historical.length}</td>
            <td>{data.operations.reduce((acc, curr) => acc + curr.Mortality, 0.0) / data.operations.length}</td>
            <td>{data.historical.reduce((acc, curr) => acc + curr.Mortality, 0.0) / data.historical.length}</td>
        </tr>
        {#each $form.procs_include as clus}
        <tr>
            <td>{clus.value}</td>
            <td>{getCount(clus.value, data.operations)}</td>
            <td>{getLOS(clus.value, data.operations)}</td>
            <td>{getLOS(clus.value, data.historical)}</td>
            <td>{getMortality(clus.value, data.operations)}</td>
            <td>{getMortality(clus.value, data.historical)}</td>
        </tr>
        {/each}
        {#if $form.procs_include.length > 0}
            <tr>
                <td>Other procedures</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.LOS), 0.0) / data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.historical.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.LOS), 0.0) / data.historical.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.Mortality), 0.0) / data.operations.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
                <td>{data.historical.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : curr.Mortality), 0.0) / data.historical.reduce((acc, curr) => acc + (checkOther(curr) ? 0.0 : 1.0), 0.0)}</td>
            </tr>
        {/if}
    </table>
    <div class="w-1/2 p-4">
        <Bar data={getCountBarData(data.operations, data.historical)} height={50} width={100} options={{ responsive: true, maintainAspectRatio: true }}/>
    </div>

<div class="p-4 m-4 border border-grey text-sm pl-10 pr-10 bg-slate-50 italic w-full">
    <tag class="w-full">
        This box provides summary statistics and an example summary plot. Additional outcomes to include would be things like readmission or HACs.
        The main goal here is to compare the selected audit period to a historical average (here 12 months) and visualise trends from the preceding audit periods.
        The plot here is count data for all operations, but plots for stratifying for operation type and across all outcomes would be very useful as well.
    </tag>
</div>
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
