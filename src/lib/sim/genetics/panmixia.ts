// /src/lib/sim/genetics/panmixia.ts

import type { Individual } from '../individual';
import { cross } from './cross';

/**
 * Performs random mating within a breeding pool to generate offspring
 * @param breedingPool Array of individuals available for mating
 * @param totalOffspring Number of offspring to generate
 * @returns Array of offspring individuals
 */
export function panmicticMate(breedingPool: Individual[], totalOffspring: number): Individual[] {
    if (breedingPool.length < 2) {
        throw new Error('Breeding pool must contain at least 2 individuals');
    }

    const offspring: Individual[] = [];
    const poolSize = breedingPool.length;

    // Pre-allocate array for better performance
    offspring.length = totalOffspring;

    for (let i = 0; i < totalOffspring; i++) {
        // Select two random parents
        const parent1Index = Math.floor(Math.random() * poolSize);
        let parent2Index = Math.floor(Math.random() * (poolSize - 1));
        
        // Adjust second parent index to avoid self-mating
        if (parent2Index >= parent1Index) parent2Index++;
        
        // Create offspring through crossing
        offspring[i] = cross(
            breedingPool[parent1Index],
            breedingPool[parent2Index]
        );
    }

    return offspring;
}