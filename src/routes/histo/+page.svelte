<script type="text/typescript">

 import Viewer from './Viewer.svelte'
import { form, clusters, labels, procs } from '../../store.ts';
    export let data;

    let clusSubset = Object.keys($clusters).filter((c) => c != 'all')

    const getCluster = (proc_code, cluster) => {
        let clist = [];
        for (const [k,v] of Object.entries($clusters)) {
            if (v.map((c) => c.value).includes(proc_code)) {
                clist.push(k)
            }
        }
        return clist.includes(cluster.label);
    }


</script>

<div class="p-3 border border-slate">
    <div>
        <p>Summary</p>
    </div>
    <div>
        <p class="text-sm"> As you sign and label the histology reports, you get an automated summary of label counts below. If we store a datasets of labels, could automate this step with some NLP machine learning.</p>
    </div>
    <div class="p-3">
        {#each Object.keys($labels) as label}
            {#if $labels[label].length > 0}
                <div class="flex">
                    <div class="pr-4">
                        {label}
                    </div>
                    <div>
                        {$labels[label].length}
                    </div>
                </div>
            {/if}
        {/each}

    </div>

</div>

<div class="p-3 border border-slate">

    {#each $form.procs_include as cluster}
        <div>
            <p>{cluster.value}: histo to check</p>
        </div>

        {#each data.operations as op}
            {#if getCluster(op.proc_code, cluster)}
                <Viewer urn={op.urn}/>
            {/if}
        {/each}
    {/each}
</div>
