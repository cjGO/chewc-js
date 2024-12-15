<!-- src/lib/components/SimulationParams.svelte -->
<script lang="ts">
    import { slide } from 'svelte/transition';
    import { simulationParams, type SimulationParams } from '../stores/simulationParams';
    
    let params: SimulationParams;
    let isExpanded = false;
    
    simulationParams.subscribe(value => {
        params = value;
    });
    
    function updateStore() {
        simulationParams.set(params);
    }
    
    function resetParams() {
        simulationParams.set({
            populationSize: 100,
            numGenerations: 10,
            numMarkers: 1000,
            maxCrossovers: 3,
            poissonLambda: 1.5,
            selectionIntensity: 0.2
        });
    }
</script>

<div class="params-panel">
    <button 
        class="toggle-button" 
        on:click={() => isExpanded = !isExpanded}
        aria-expanded={isExpanded}
    >
        <span>Simulation Parameters</span>
        <svg 
            class="chevron" 
            class:rotated={isExpanded} 
            width="20" 
            height="20" 
            viewBox="0 0 20 20"
        >
            <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
    </button>

    {#if isExpanded}
        <div class="params-content" transition:slide={{duration: 300}}>
            <div class="params-grid">
                <div class="param-item">
                    <label for="popSize">Population Size</label>
                    <input 
                        id="popSize"
                        type="number" 
                        bind:value={params.populationSize}
                        min="10" 
                        max="1000"
                        on:change={updateStore}
                    />
                </div>
                
                <div class="param-item">
                    <label for="numGen">Generations</label>
                    <input 
                        id="numGen"
                        type="number" 
                        bind:value={params.numGenerations}
                        min="1" 
                        max="100"
                        on:change={updateStore}
                    />
                </div>
                
                <div class="param-item">
                    <label for="numMarkers">Markers</label>
                    <input 
                        id="numMarkers"
                        type="number" 
                        bind:value={params.numMarkers}
                        min="100" 
                        max="10000"
                        on:change={updateStore}
                    />
                </div>
                
                <div class="param-item">
                    <label for="maxCross">Max Crossovers</label>
                    <input 
                        id="maxCross"
                        type="number" 
                        bind:value={params.maxCrossovers}
                        min="1" 
                        max="10"
                        on:change={updateStore}
                    />
                </div>
                
                <div class="param-item">
                    <label for="poisson">Poisson λ</label>
                    <input 
                        id="poisson"
                        type="number" 
                        bind:value={params.poissonLambda}
                        min="0.1" 
                        max="5"
                        step="0.1"
                        on:change={updateStore}
                    />
                </div>
                
                <div class="param-item">
                    <label for="selection">Selection Intensity</label>
                    <input 
                        id="selection"
                        type="number" 
                        bind:value={params.selectionIntensity}
                        min="0.01" 
                        max="1"
                        step="0.01"
                        on:change={updateStore}
                    />
                </div>
            </div>
            
            <button class="reset-button" on:click={resetParams}>
                Reset to Defaults
            </button>
        </div>
    {/if}
</div>

<style>
    .params-panel {
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 300px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 1000;
    }

    .toggle-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: none;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        border-radius: 8px;
    }

    .toggle-button:hover {
        background: #f5f5f5;
    }

    .chevron {
        transition: transform 0.3s ease;
    }

    .chevron.rotated {
        transform: rotate(180deg);
    }

    .params-content {
        padding: 1rem;
        border-top: 1px solid #eee;
    }

    .params-grid {
        display: grid;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .param-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    label {
        font-size: 0.9rem;
        color: #666;
    }

    input {
        width: 80px;
        padding: 0.25rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.9rem;
    }

    input:focus {
        outline: none;
        border-color: #0066cc;
        box-shadow: 0 0 0 2px rgba(0,102,204,0.2);
    }

    .reset-button {
        width: 100%;
        padding: 0.5rem;
        background: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .reset-button:hover {
        background: #e5e5e5;
    }
</style>