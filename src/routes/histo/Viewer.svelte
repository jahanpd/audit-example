<script type="text/javascript">

    import { labels } from '../../store.ts';
    export let urn;
    let signed = false;
    export let label;

    const editLabels = () => {
        let keys = Object.keys($labels);
        for (let i in keys) {
            // filter each array to remove urn
            $labels[keys[i]] = $labels[keys[i]].filter((c) => c != urn)
        }
        if (!keys.includes(label)) {
            console.log("ASKJDHFSAKDJ", label, urn, $label)
            $labels[label] = [urn]
        } else if (keys.includes(label)) {
            $labels[label].push(urn)
        }
    }
</script>

<div class="flex p-3">

    <div class="p-3 bg-slate-100 w-1/3">
        <p> URN: {urn} </p>
    </div>
    <div class="w-full">
        {#if signed}
            <div>
                <p>List of reports form histology sent on the day of the operation</p>
            </div>
        {:else}
            <div class="flex items-center">
                <button class="w-full p-3 rounded-lg bg-sky-500 hover:bg-sky-700" on:click={() => signed = true}> Sign Test </button>
            </div>
        {/if}
    </div>
    <div>
        <input type="" class="p-3 w-500" placeholder="label for summary" on:change={editLabels} bind:value={label}/>
    </div>
</div>
