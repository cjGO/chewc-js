<script lang="ts">
    import { writable } from 'svelte/store';

    const currentSequence = writable(1);
    const sequenceComplete = writable({
        1: false,
        2: false,
        3: false,
        4: false
    });

    let params = {
        sequence1: {
            nMarkers: 1000
        },
        sequence2: {
            founderSize: 100
        },
        sequence3: {
            parentCount: 20
        },
        sequence4: {
            selectionIntensity: 0.4,
            generations: 5
        }
    };

    function handleSequenceComplete(sequence: number) {
        sequenceComplete.update(s => ({ ...s, [sequence]: true }));
        if (sequence < 4) {
            currentSequence.update(n => n + 1);
        }
    }
</script>

<div class="simulation-setup">
    <h1>Breeding Simulation Setup</h1>

    <div class="sequence-list">
        <!-- Sequence 1 -->
        <div class="sequence-item" class:active={$currentSequence === 1}>
            <div class="sequence-header">
                {#if $sequenceComplete[1]}
                    <div class="check-circle">✓</div>
                {:else}
                    <div class="number-circle">1</div>
                {/if}
                <h2>Chromosome Design</h2>
            </div>
            {#if $currentSequence === 1}
                <div class="sequence-content">
                    <div class="param-group">
                        <label>
                            Number of Markers: {params.sequence1.nMarkers}
                            <input 
                                type="range"
                                bind:value={params.sequence1.nMarkers}
                                min="100"
                                max="10000"
                                step="100"
                            />
                        </label>
                    </div>
                    <button 
                        class="continue-btn"
                        on:click={() => handleSequenceComplete(1)}
                    >
                        Continue
                    </button>
                </div>
            {/if}
        </div>

        <!-- Sequence 2 -->
        <div class="sequence-item" class:active={$currentSequence === 2}>
            <div class="sequence-header">
                {#if $sequenceComplete[2]}
                    <div class="check-circle">✓</div>
                {:else}
                    <div class="number-circle">2</div>
                {/if}
                <h2>Founder Pool</h2>
            </div>
            {#if $currentSequence === 2}
                <div class="sequence-content">
                    <div class="param-group">
                        <label>
                            Founder Population Size: {params.sequence2.founderSize}
                            <input 
                                type="range"
                                bind:value={params.sequence2.founderSize}
                                min="10"
                                max="1000"
                                step="10"
                            />
                        </label>
                    </div>
                    <button 
                        class="continue-btn"
                        on:click={() => handleSequenceComplete(2)}
                        disabled={!$sequenceComplete[1]}
                    >
                        Generate Founders
                    </button>
                </div>
            {/if}
        </div>

        <!-- Sequence 3 -->
        <div class="sequence-item" class:active={$currentSequence === 3}>
            <div class="sequence-header">
                {#if $sequenceComplete[3]}
                    <div class="check-circle">✓</div>
                {:else}
                    <div class="number-circle">3</div>
                {/if}
                <h2>Sample Parents</h2>
            </div>
            {#if $currentSequence === 3}
                <div class="sequence-content">
                    <div class="param-group">
                        <label>
                            Number of Parents: {params.sequence3.parentCount}
                            <input 
                                type="range"
                                bind:value={params.sequence3.parentCount}
                                min="2"
                                max={params.sequence2.founderSize}
                                step="1"
                            />
                        </label>
                    </div>
                    <button 
                        class="continue-btn"
                        on:click={() => handleSequenceComplete(3)}
                        disabled={!$sequenceComplete[2]}
                    >
                        Select Parents
                    </button>
                </div>
            {/if}
        </div>

        <!-- Sequence 4 -->
        <div class="sequence-item" class:active={$currentSequence === 4}>
            <div class="sequence-header">
                {#if $sequenceComplete[4]}
                    <div class="check-circle">✓</div>
                {:else}
                    <div class="number-circle">4</div>
                {/if}
                <h2>Selection Rounds</h2>
            </div>
            {#if $currentSequence === 4}
                <div class="sequence-content">
                    <div class="param-group">
                        <label>
                            Selection Intensity: {params.sequence4.selectionIntensity.toFixed(2)}
                            <input 
                                type="range"
                                bind:value={params.sequence4.selectionIntensity}
                                min="0.01"
                                max="1"
                                step="0.01"
                            />
                        </label>
                        <label>
                            Number of Generations: {params.sequence4.generations}
                            <input 
                                type="range"
                                bind:value={params.sequence4.generations}
                                min="1"
                                max="100"
                                step="1"
                            />
                        </label>
                    </div>
                    <button 
                        class="start-btn"
                        on:click={() => handleSequenceComplete(4)}
                        disabled={!$sequenceComplete[3]}
                    >
                        Start Simulation
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .simulation-setup {
        max-width: 400px;
        margin: 1rem 0;
        padding: 0.5rem;
    }

    h1 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }

    .sequence-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .sequence-item {
        border-radius: 4px;
        padding: 0.5rem;
        background: #f8f9fa;
    }

    .sequence-item.active {
        background: white;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .sequence-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .check-circle, .number-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .check-circle {
        background: #1a1a1a;
        color: white;
    }

    .number-circle {
        background: white;
        border: 2px solid #1a1a1a;
        color: #1a1a1a;
    }

    .sequence-content {
        margin-top: 0.5rem;
        padding-left: 2rem;
    }

    .param-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-weight: 500;
        font-size: 0.9rem;
    }

    input[type="range"] {
        width: 100%;
        margin: 0.25rem 0;
    }

    button {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 0.9rem;
    }

    .continue-btn {
        background: #1a1a1a;
        color: white;
    }

    .start-btn {
        background: #1a1a1a;
        color: white;
    }

    button:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        opacity: 0.9;
    }

    h2 {
        font-size: 1rem;
        margin: 0;
    }
</style>