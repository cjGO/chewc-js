// /src/lib/sim/genetics/index.ts

// Re-export everything from these modules
export * from './cross';
export * from './chromosome';

// You can also export specific types that are core to the genetics module
export type GeneticMarker = 0 | 1;
export type ChromosomePosition = number;

// If you have any genetics-specific constants
export const MAX_CROSSOVERS = 3;
export const DEFAULT_POISSON_LAMBDA = 1.5;