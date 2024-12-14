<script lang="ts">
	export let title: string;
	export let isOpen = true;
</script>

<div class="border rounded-lg mb-4">
	<button
		class="w-full p-4 text-left font-bold flex justify-between items-center"
		on:click={() => (isOpen = !isOpen)}
	>
		{title}
		<span class="transform transition-transform {isOpen ? 'rotate-180' : ''}"> ▼ </span>
	</button>

	{#if isOpen}
		<div class="p-4 border-t">
			<slot />
		</div>
	{/if}
</div>
