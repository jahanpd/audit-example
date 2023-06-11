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
    </div>

    <div class="p-4 m-4 border border-grey text-sm pl-10 pr-10 bg-slate-50 italic w-full">
        <tag class="w-full">
        <p class="text-sm"> As you sign and label the histology reports, you get an automated summary of label counts below.
            If we store a datasets of labels, we could even experiment with automating this step with some NLP machine learning.
            While this summary doesn't stratify by operation type, it actually should.
            Additionally, past histo that is not in the current audit period and that hasn't been labeled should come up.
        </p>
        <br />
        This page should pull the histo/micro/cell cytology reports etc from the same say as the operation and present them.
        The main advantage of having a page like this it would greatly speed up collating histo data for audit purposes which currently requires typing many URNs into bossnet which is time consuming and laborious.
        This is espcially true for endoscopy audits as we do a lot of endoscopy... <br /> <br />
        I understand that metadata for viewing this result needs to be recorded, so registering users of this audit tool and recording the user who signs the report would be one solution.
        Please note that this audit process / counting histology is separate from patient care side of things. All results are checked in outpatient clinic at followup.
        </tag>
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
