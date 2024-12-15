// /src/lib/sim/genetics/trait.ts

import type { Individual } from '../individual';

export interface AdditiveTrait {
    readonly effects: Float32Array;  // Effect size for each marker
    readonly name: string;
}

export function createAdditiveTrait(numMarkers: number, name: string): AdditiveTrait {
    const effects = new Float32Array(numMarkers);
    
    // Initialize random effect sizes
    // Using small effect sizes (-0.5 to 0.5) for realistic genetic architecture
    for (let i = 0; i < numMarkers; i++) {
        effects[i] = (Math.random() - 0.5);
    }
    
    return { effects, name };
}

export function calculateTraitValue(individual: Individual, trait: AdditiveTrait): number {
    let value = 0;
    const { maternalChromosome, paternalChromosome } = individual;
    
    // Sum effects across all markers
    for (let i = 0; i < trait.effects.length; i++) {
        // Add effect if allele is present (1)
        if (maternalChromosome.markers[i]) {
            value += trait.effects[i];
        }
        if (paternalChromosome.markers[i]) {
            value += trait.effects[i];
        }
    }
    
    return value;
}