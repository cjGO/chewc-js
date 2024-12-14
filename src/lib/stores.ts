// lib/stores.ts
import { writable } from 'svelte/store';
import type { Chromosome, Individual } from './core';
import { resetNextFounderId, resetNextIndividualId, createFounderIndividual } from './core';

export const founderPool = writable<Chromosome[]>([]);

export function addChromosome(chromosome: Chromosome) {
	founderPool.update((pool) => [...pool, chromosome]);
}

// Resets the pool and optionally resets the nextFounderId counter
export function resetFounderPool(preserveIdCounter = false) {
	if (preserveIdCounter) {
		founderPool.set([]);
	} else {
		founderPool.set([]);
		resetNextFounderId(); // Reset the counter in core.ts
	}
}

export function removeChromosome(index: number) {
	founderPool.update((pool) => {
		const newPool = [...pool];
		newPool.splice(index, 1);
		return newPool;
	});
}



export const founderIndividuals = writable<Individual[]>([]);

export function addIndividual(individual: Individual) {
  founderIndividuals.update(individuals => [...individuals, individual]);
}

export function removeIndividual(index: number) {
  founderIndividuals.update(individuals => {
    const newIndividuals = [...individuals];
    newIndividuals.splice(index, 1);
    return newIndividuals;
  });
}

export function resetIndividualPool(preserveIdCounter = false) {
  founderIndividuals.set([]);
  if (!preserveIdCounter) {
    resetNextIndividualId();
  }
}

// Helper function to create individuals from the founder pool
export function sampleFounderIndividuals(count: number) {
  founderPool.subscribe(pool => {
    if (pool.length < 2) {
      throw new Error('Need at least 2 founder chromosomes to create individuals');
    }
    
    for (let i = 0; i < count; i++) {
      // Random sampling without replacement for each individual
      const availableIndices = Array.from({length: pool.length}, (_, i) => i);
      
      // Sample maternal chromosome
      const maternalIdx = Math.floor(Math.random() * availableIndices.length);
      const maternalChromosome = pool[availableIndices[maternalIdx]];
      availableIndices.splice(maternalIdx, 1);
      
      // Sample paternal chromosome
      const paternalIdx = Math.floor(Math.random() * availableIndices.length);
      const paternalChromosome = pool[availableIndices[paternalIdx]];
      
      const individual = createFounderIndividual(maternalChromosome, paternalChromosome);
      addIndividual(individual);
    }
  }).unsubscribe();
}