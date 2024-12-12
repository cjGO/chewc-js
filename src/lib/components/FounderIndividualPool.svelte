<script lang="ts">
	import {
		founderPool,
		founderIndividuals,
		sampleFounderIndividuals,
		resetIndividualPool
	} from '$lib/stores';
	import FounderIndividualView from './FounderIndividualView.svelte';

	let numIndividualsToCreate = 1;

	function handleCreateIndividuals() {
		sampleFounderIndividuals(numIndividualsToCreate);
	}
</script>

<div class="container mx-auto p-4">
	<h2 class="text-xl font-bold mb-4">Founder Individuals</h2>

	<div class="flex gap-4 mb-4">
		<label>
			Number of Individuals to Create
			<input type="number" bind:value={numIndividualsToCreate} min="1" class="border p-2 rounded" />
		</label>

		<button
			on:click={handleCreateIndividuals}
			class="bg-blue-500 text-white px-4 py-2 rounded"
			disabled={$founderPool.length < 2}
		>
			Create Individuals
		</button>

		<button
			on:click={() => resetIndividualPool(false)}
			class="bg-red-500 text-white px-4 py-2 rounded"
		>
			Reset Individuals
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each $founderIndividuals as individual, i}
			<FounderIndividualView {individual} />
		{/each}
	</div>
</div>
