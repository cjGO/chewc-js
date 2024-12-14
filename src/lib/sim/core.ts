//core.ts
let nextFounderId = 1;

export const resetNextFounderId = () => {
	nextFounderId = 1;
};

export type Chromosome = {
	markers: number[];
	origins: number[];
};

export function createChromosome(numMarkers: number): Chromosome {
	const founderId = nextFounderId++;
	return {
		markers: Array.from({ length: numMarkers }, () => (Math.random() < 0.5 ? 0 : 1)),
		origins: Array(numMarkers).fill(founderId)
	};
}

// Logic for sampling founder individuals

export type Individual = {
  id: number;
  maternalChromosome: Chromosome;
  paternalChromosome: Chromosome;
};

let nextIndividualId = 1;

export const resetNextIndividualId = () => {
  nextIndividualId = 1;
};

export function createFounderIndividual(
  maternalChromosome: Chromosome, 
  paternalChromosome: Chromosome
): Individual {
  return {
    id: nextIndividualId++,
    maternalChromosome,
    paternalChromosome
  };
}


export function samplePoisson(lambda: number): number {
  let L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  
  return k - 1;
}