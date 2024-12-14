import type { Individual } from './core';
import { createFounderIndividual } from './core';
import { meiosis } from './meiosis';

/**
 * Creates a new individual by crossing two parents through meiosis and fertilization
 * @param parent1 First parent individual
 * @param parent2 Second parent individual
 * @returns A new Individual representing the offspring
 */
export function cross(parent1: Individual, parent2: Individual): Individual {
    // Perform meiosis for each parent to create gametes
    const parent1Gamete = meiosis(parent1);
    const parent2Gamete = meiosis(parent2);
    
    // Create new individual using the gametes
    // We randomly assign which gamete becomes maternal/paternal
    const shouldSwap = Math.random() < 0.5;
    const maternalChromosome = shouldSwap ? parent2Gamete : parent1Gamete;
    const paternalChromosome = shouldSwap ? parent1Gamete : parent2Gamete;
    
    // Create and return the new individual
    return createFounderIndividual(maternalChromosome, paternalChromosome);
}

/**
 * Creates multiple offspring from the same parents
 * @param parent1 First parent individual
 * @param parent2 Second parent individual
 * @param numOffspring Number of offspring to create
 * @returns Array of new Individuals
 */
export function crossMultiple(
    parent1: Individual, 
    parent2: Individual, 
    numOffspring: number
): Individual[] {
    return Array.from(
        { length: numOffspring }, 
        () => cross(parent1, parent2)
    );
}
