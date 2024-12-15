// src/lib/stores/simulation.ts
import { writable } from 'svelte/store';
import type { SimulationParams, SimulationState } from '../types/simulation';

export const simulationParams = writable<SimulationParams>({
  numMarkers: 100,
  numFounders: 50,
  burnIn: {
    generations: 10,
    popSize: 200,
    selectionIntensity: 0.8
  }
});

export const simulationState = writable<SimulationState>({
  status: 'idle',
  currentGeneration: 0,
  progress: 0
});