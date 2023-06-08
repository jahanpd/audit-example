<script>
import "../app.css";
import { form, clusters } from '../store.ts';

$form.procs_include = $form.procs_include.map((c) => $clusters[c.value]).flat()

const output = (k) => {
     if (k != "procs_include") return JSON.stringify($form[k]);
     return JSON.stringify(
         $form.procs_include.length > 0 ? $form.procs_include.map((c) => $clusters[c.value]).flat() : "")
 }

</script>

<nav class="bg-white p-3 flex justify-center">
    <div class="flex border-2 border-black flex-wrap justify-between items-center w-1/2 rounded-lg">
        <a class="hover:bg-slate-100 p-3 rounded-lg" href="/">FILTERS</a>
        <a class="hover:bg-slate-100 p-3 rounded-lg" href="/clusters">CLUSTERS</a>

        {#if $form.start && $form.end}
            <a
    class="hover:bg-slate-100 p-3 rounded-lg"
    href={`/stats?${Object.keys($form).map((k) => `${k}=${output(k)}`).join("&")}`}>
                STATS</a>
            <a
    class="hover:bg-slate-100 p-3 rounded-lg"
    href={`/histo?${Object.keys($form).map((k) => `${k}=${output(k)}`).join("&")}`}>
               HISTO</a>
        {:else}
            <p class="text-slate-300 p-3">STATS</p>
            <p class="text-slate-300 p-3">HISTO</p>
        {/if}
    </div>
</nav>

<div class="p-3">
    <slot></slot>
</div>
