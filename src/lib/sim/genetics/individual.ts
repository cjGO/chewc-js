//individual

import type { Chromosome } from "./chromosome";

let nextFounderId = 1;

export const resetNextFounderId = () => {
	nextFounderId = 1;
};

// Logic for sampling founder individuals

export type Individual = {
  id: number;
  maternalChromosome: Chromosome;
  paternalChromosome: Chromosome;
  generation : number;
};

export let nextIndividualId = 1;

export const resetNextIndividualId = () => {
  nextIndividualId = 1;
};

export function createIndividual(maternalChromosome: Chromosome, paternalChromosome: Chromosome, generation: number): Individual {
  return {
    id: nextIndividualId++,
    maternalChromosome,
    paternalChromosome,
    generation
  };
};
