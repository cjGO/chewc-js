// /src/lib/sim/genetics/burn-in.ts


import type { Individual } from '../individual';
import { createIndividual } from '../individual';
import type { AdditiveTrait } from './trait';
import { cross, crossMultiple } from './cross';
import { calculateTraitValue } from './trait';

interface BurnInConfig {
    numGenerations: number;     
    populationSize: number;     
}

interface BurnInResult {
    population: Individual[];    
    generations: number;        
}

function burnIn(
    founders: Individual[],
    trait: AdditiveTrait,
    config: BurnInConfig
): BurnInResult {
    let currentPop = [...founders];
    const { numGenerations, populationSize } = config;
    
    // Pre-allocate arrays for performance
    const traitValues = new Float32Array(populationSize);
    
    // Run for specified number of generations
    for (let gen = 0; gen < numGenerations; gen++) {
        // Calculate trait values for current population
        for (let i = 0; i < currentPop.length; i++) {
            traitValues[i] = calculateTraitValue(currentPop[i], trait);
        }
        
        // Create next generation through random mating
        const nextGen: Individual[] = [];
        
        // Generate pairs of parents using random selection
        while (nextGen.length < populationSize) {
            // Randomly select parents
            const parent1Index = Math.floor(Math.random() * currentPop.length);
            let parent2Index = Math.floor(Math.random() * (currentPop.length - 1));
            // Adjust to avoid self-mating
            if (parent2Index >= parent1Index) parent2Index++;
            
            // Create offspring
            const offspring = cross(
                currentPop[parent1Index],
                currentPop[parent2Index]
            );
            
            nextGen.push(offspring);
        }
        
        // Update current population
        currentPop = nextGen;
    }
    
    return {
        population: currentPop,
        generations: numGenerations
    };
}

// Helper function to batch create offspring for better performance
function createOffspringBatch(
    parent1: Individual,
    parent2: Individual,
    batchSize: number
): Individual[] {
    return crossMultiple(parent1, parent2, batchSize);
}

export type { BurnInConfig, BurnInResult };
export { burnIn };