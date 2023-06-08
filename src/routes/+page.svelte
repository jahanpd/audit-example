<script type="text/typescript">
    import { form, clusters, procs, teams, consultants, urgent } from '../store.ts';
    export let formSub = $form;
    let clusterKeys = Object.keys($clusters);

    console.log(form);
    console.log(formSub);

    import Select from 'svelte-select';
    const fromChange = (event) => {
        let date = new Date(event.target.value).toISOString().substr(0, 10);
        formSub.start = date;
        form.update((c) => formSub);
    }
    const toChange = (event) => {
        let date = new Date(event.target.value).toISOString().substr(0, 10);
        formSub.end = date;
        form.update((c) => formSub);
    }
    const numChange = (key) => {
        form.update((c) => formSub)
    }

</script>

<div class="p-4 m-4 border border-grey">
    <tag>
        This tab is not particularly novel, and basically recreates the filter for the 6 month surgical audit on data warehouse.
        The main innovation is adding in a category for procedure clusters rather than purely a procedure.
        These can be defined in the cluster tab.
        Ideally these queries can be saved and reused by multiple users to save time.
        <br /><br />
        Unlock the stats and histo tabs by filling in a date range. All other inputs are optional.
        Data is only procedurally generated for the preceding two weeks from today.
    </tag>
</div>
<div class="p-4 m-4 border border-grey">
    <h1 class="text-lg pb-2">INCLUSION</h1>
    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Date Range - Mandatory</h1>
        <div class="flex">
            <p class="pr-3">From: </p><input type="date" bind:value={formSub.start} on:change={fromChange}/>
        </div>
        <div class="flex">
            <p class="pr-3">To: </p><input type="date" bind:value={formSub.end} on:change={toChange}/>
        </div>
    </div>

    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Team(s)</h1>
        <Select items={teams} multiple={true} bind:value={formSub.teams} on:change={() => numChange("teams")}/>
    </div>

    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Consultant(s)</h1>
        <Select items={consultants} multiple={true} bind:value={formSub.consultant_include} on:change={() => numChange("consultant_include")} />
    </div>


    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Procedure Code Cluster</h1>
        <Select items={clusterKeys.filter((c) => c != "all")} multiple={true} bind:value={formSub.procs_include} on:change={() => numChange("procs_include")} />
    </div>

    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Operative Urgency</h1>
        <Select items={urgent} multiple={true} bind:value={formSub.urgency} on:change={() => numChange("urgency")} />
    </div>
</div>


<div class="p-4 m-4 border border-grey">
    <h1 class="text-lg pb-2">EXCLUSION</h1>

    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Consultant(s)</h1>
        <Select items={consultants} multiple={true} bind:value={formSub.consultant_exclude} on:change={() => numChange("consultant_exclude")} />
    </div>

    <div class="p-4 m-4 border border-black">
        <h1 class="text-lg pb-2">Procedure Code(s)</h1>
        <Select items={procs} multiple={true} bind:value={formSub.procs_exclude} on:change={() => numChange("procs_exclude")} />
    </div>
</div>
