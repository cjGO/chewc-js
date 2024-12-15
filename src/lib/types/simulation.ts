// src/lib/types/simulation.ts
export interface SimulationParams {
    numMarkers: number;
    numFounders: number;
    burnIn: {
      generations: number;
      popSize: number;
      selectionIntensity: number;
    }
  }
  
  export interface SimulationState {
    status: 'idle' | 'running' | 'complete';
    currentGeneration: number;
    progress: number;
  }