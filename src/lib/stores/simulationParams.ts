// src/lib/stores/simulationParams.ts
import { writable } from 'svelte/store';

export interface SimulationParams {
    populationSize: number;
    numGenerations: number;
    numMarkers: number;
    maxCrossovers: number;
    poissonLambda: number;
    selectionIntensity: number;
}

// Default values informed by typical plant breeding scenarios
const defaultParams: SimulationParams = {
    populationSize: 100,
    numGenerations: 10,
    numMarkers: 1000,
    maxCrossovers: 3,
    poissonLambda: 1.5,
    selectionIntensity: 0.2
};

export const simulationParams = writable<SimulationParams>(defaultParams);
