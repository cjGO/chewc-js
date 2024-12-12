<script lang="ts">
	import type { Individual } from '$lib/core';
	export let individual: Individual;

	const cellSize = 40;
	const margin = { top: 10, right: 10, bottom: 10, left: 10 };

	// Compute dimensions
	$: width = cellSize * individual.maternalChromosome.markers.length + margin.left + margin.right;
	$: height = cellSize * 4 + margin.top + margin.bottom; // Now 4 rows

	// Create data array for positions
	$: maternalPositions = individual.maternalChromosome.markers.map((marker, i) => ({
		marker,
		origin: individual.maternalChromosome.origins[i],
		x: i * cellSize + margin.left
	}));

	$: paternalPositions = individual.paternalChromosome.markers.map((marker, i) => ({
		marker,
		origin: individual.paternalChromosome.origins[i],
		x: i * cellSize + margin.left
	}));
</script>

<svg {width} {height}>
	<!-- Maternal Chromosome -->
	{#each maternalPositions as { marker, origin, x }, i}
		<g transform="translate({x},{margin.top})">
			<!-- Maternal Origin (Top Row) -->
			<rect
				width={cellSize - 2}
				height={cellSize - 2}
				fill="#FEF3C7"
				stroke="#374151"
				stroke-width="1"
			/>
			<text
				x={(cellSize - 2) / 2}
				y={(cellSize - 2) / 2}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{origin}
			</text>

			<!-- Maternal Marker (Second Row) -->
			<rect
				width={cellSize - 2}
				height={cellSize - 2}
				y={cellSize}
				fill={marker === 1 ? '#3B82F6' : '#E5E7EB'}
				stroke="#374151"
				stroke-width="1"
			/>
			<text
				x={(cellSize - 2) / 2}
				y={cellSize + (cellSize - 2) / 2}
				text-anchor="middle"
				dominant-baseline="middle"
				fill={marker === 1 ? 'white' : 'black'}
			>
				{marker}
			</text>
		</g>
	{/each}

	<!-- Paternal Chromosome -->
	{#each paternalPositions as { marker, origin, x }, i}
		<g transform="translate({x},{margin.top + cellSize * 2})">
			<!-- Paternal Marker (Third Row) -->
			<rect
				width={cellSize - 2}
				height={cellSize - 2}
				fill={marker === 1 ? '#3B82F6' : '#E5E7EB'}
				stroke="#374151"
				stroke-width="1"
			/>
			<text
				x={(cellSize - 2) / 2}
				y={(cellSize - 2) / 2}
				text-anchor="middle"
				dominant-baseline="middle"
				fill={marker === 1 ? 'white' : 'black'}
			>
				{marker}
			</text>

			<!-- Paternal Origin (Bottom Row) -->
			<rect
				width={cellSize - 2}
				height={cellSize - 2}
				y={cellSize}
				fill="#FEF3C7"
				stroke="#374151"
				stroke-width="1"
			/>
			<text
				x={(cellSize - 2) / 2}
				y={cellSize + (cellSize - 2) / 2}
				text-anchor="middle"
				dominant-baseline="middle"
			>
				{origin}
			</text>
		</g>
	{/each}
</svg>
