<!-- src/lib/components/SimulationSetup.svelte -->
<script lang="ts">
  import { simulationParams } from '../stores/simulation';
  import type { SimulationParams } from '../types/simulation';
  
  let params: SimulationParams = $simulationParams;
  
  function handleSubmit() {
    simulationParams.set(params);
    // Trigger simulation start
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="grid gap-4">
  <div class="form-group">
    <label for="numMarkers">Number of Markers</label>
    <input 
      type="number" 
      id="numMarkers"
      bind:value={params.numMarkers}
      min="1"
      required
    />
  </div>
  
  <!-- Similar inputs for other parameters -->
  
  <button type="submit">Start Simulation</button>
</form>