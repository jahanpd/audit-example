<script type="text/typescript">

import Adder from './Adder.svelte';
import { clusters } from '../../store.ts';

</script>
<div class="p-3">
    <p>
        This little form allows the user to create procedure code 'clusters.' Useful for auditing procedures with multiple different codes (eg open or lap appendix, or endoscopy).
        Ideally these clusters can be saved and reused used by multiple people.
    </p>
</div>

<div class="border border-black">
    {#each Object.keys($clusters) as key}
        {#if $clusters[key]}
            <div class="flex">
                <div class="p-3 bg-slate-100">
                    <p>{key}:</p>
                </div>
                <div class="p-3">
                    <p>{$clusters[key].map((c) => c.label).join(", ")}</p>
                </div>
            </div>
        {/if}

    {/each}
</div>

<div class="p-3">
    <p>Use the form below to add a new procedure cluster (such as for procedures 5 and 6 which are unclustered)</p>
</div>

<Adder/>
