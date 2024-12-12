<script lang="ts">
	import { founderPool, addChromosome, resetFounderPool, removeChromosome } from '$lib/stores';
	import { createChromosome } from '$lib/core';
	import ChromosomeView from './ChromosomeView.svelte';

	let numChromosomesToAdd = 5;
	let numMarkers = 10;
	let chromosomesToRemove: number[] = [];
	let markersFixed = false;
	$: markersFixed = $founderPool.length > 0;

	function generateChromosomes() {
		for (let i = 0; i < numChromosomesToAdd; i++) {
			const newChromosome = createChromosome(numMarkers);
			addChromosome(newChromosome);
		}
	}

	function handleReset(preserveId: boolean) {
		resetFounderPool(preserveId);
		markersFixed = false;
	}

	function toggleChromosomeForRemoval(index: number) {
		if (chromosomesToRemove.includes(index)) {
			chromosomesToRemove = chromosomesToRemove.filter((i) => i !== index);
		} else {
			chromosomesToRemove = [...chromosomesToRemove, index];
		}
	}

	function removeSelectedChromosomes() {
		removeChromosomeIndices(chromosomesToRemove);
		chromosomesToRemove = [];
		if ($founderPool.length === 0) {
			markersFixed = false;
		}
	}

	function removeChromosomeIndices(indices: number[]) {
		founderPool.update((pool) => {
			// Create a copy of the indices array and sort it in descending order to avoid index shifting issues
			const sortedIndices = [...indices].sort((a, b) => b - a);

			// Remove chromosomes at the specified indices
			for (const index of sortedIndices) {
				if (index >= 0 && index < pool.length) {
					pool.splice(index, 1);
				}
			}
			return pool;
		});
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Founder Chromosome Pool</h1>

	<div class="flex gap-4 mb-4">
		<label>
			Number of Chromosomes to Add
			<input type="number" bind:value={numChromosomesToAdd} min="1" class="border p-2 rounded" />
		</label>

		<label>
			Markers per Chromosomes
			<input
				type="number"
				bind:value={numMarkers}
				min="1"
				class="border p-2 rounded"
				disabled={markersFixed}
			/>
		</label>

		<div class="flex gap-2">
			<button on:click={generateChromosomes} class="bg-blue-500 text-white px-4 py-2 rounded">
				Add Chromosomes
			</button>

			<button on:click={() => handleReset(false)} class="bg-red-500 text-white px-4 py-2 rounded">
				Reset Pool and IDs
			</button>

			<button on:click={() => handleReset(true)} class="bg-orange-500 text-white px-4 py-2 rounded">
				Reset Pool
			</button>

			<button
				on:click={removeSelectedChromosomes}
				class="bg-yellow-600 text-white px-4 py-2 rounded"
				disabled={chromosomesToRemove.length === 0}
			>
				Remove Selected
			</button>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each $founderPool as chromosome, i}
			<div class="border rounded p-4 mb-4 relative">
				<input
					type="checkbox"
					class="absolute top-2 right-2"
					on:change={() => toggleChromosomeForRemoval(i)}
					checked={chromosomesToRemove.includes(i)}
				/>
				<ChromosomeView {chromosome} />
			</div>
		{/each}
	</div>
</div>
