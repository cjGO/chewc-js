<script lang="ts">
    import type { Chromosome } from '$lib/core';
    export let chromosome: Chromosome;

    const cellSize = 40;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    
    // Compute dimensions
    $: width = cellSize * chromosome.markers.length + margin.left + margin.right;
    $: height = cellSize * 2 + margin.top + margin.bottom;
    
    // Create data array for positions
    $: positions = chromosome.markers.map((marker, i) => ({
        marker,
        origin: chromosome.origins[i],
        x: i * cellSize + margin.left
    }));
</script>

<svg {width} {height}>
    {#each positions as {marker, origin, x}, i}
        <g transform="translate({x},{margin.top})">
            <!-- Marker rectangle (top) -->
            <rect
                width={cellSize - 2}
                height={cellSize - 2}
                fill={marker === 1 ? '#3B82F6' : '#E5E7EB'}
                stroke="#374151"
                stroke-width="1"
            />
            
            <!-- Marker value -->
            <text
                x={(cellSize - 2) / 2}
                y={(cellSize - 2) / 2}
                text-anchor="middle"
                dominant-baseline="middle"
                fill={marker === 1 ? 'white' : 'black'}
            >
                {marker}
            </text>
            
            <!-- Origin rectangle (bottom) -->
            <rect
                width={cellSize - 2}
                height={cellSize - 2}
                y={cellSize}
                fill="#FEF3C7"
                stroke="#374151"
                stroke-width="1"
            />
            
            <!-- Origin value -->
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