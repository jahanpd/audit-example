<script type="text/typescript">
    import Select from 'svelte-select';
    import { clusters, procs } from '../../store.ts';

    export let key = "";
    export let cluster = [];

    const addKey = () => {
        if (!key) return;
        if (cluster.length == 0) return;
        console.log(key, cluster)
        $clusters[key] = cluster
    }

</script>

<div class="flex items-center">
    <div class="p-3">
        <input class="p-3" placeholder="insert name here" bind:value={key} />
    </div>
    <div class="p-3 w-full">
        <Select items={procs} multiple={true} bind:value={cluster} />
    </div>
    <button class="p-3 rounded-lg bg-sky-500 hover:bg-sky-700 border border-black" on:click={addKey}>
        <p >ADD</p>
    </button>
</div>
