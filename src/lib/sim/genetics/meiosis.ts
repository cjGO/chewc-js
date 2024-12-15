// /src/lib/sim/genetics/meiosis.ts

import type { Individual } from '../individual';
import type { Chromosome } from './chromosome';
import { ChromosomeImpl } from './chromosome';
import { samplePoisson, randomRange } from '../utils/random';

export interface MeiosisConfig {
  maxCrossovers: number;
  poissonLambda: number;
}

const DEFAULT_CONFIG: MeiosisConfig = {
  maxCrossovers: 3,
  poissonLambda: 1.5
} as const;

export class MeiosisSimulator {
  private config: MeiosisConfig;

  constructor(config: Partial<MeiosisConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  simulate(parent: Individual): Chromosome {
    const numCrossovers = Math.min(
      this.config.maxCrossovers, 
      samplePoisson(this.config.poissonLambda)
    );
    
    const chromosomeLength = parent.maternalChromosome.markers.length;
    const crossoverPositions = this.generateCrossoverPositions(numCrossovers, chromosomeLength);
    
    return this.createRecombinedChromosome(
      parent.maternalChromosome,
      parent.paternalChromosome,
      crossoverPositions,
      chromosomeLength
    );
  }

  private generateCrossoverPositions(numCrossovers: number, length: number): number[] {
    const positions = new Set<number>();
    while (positions.size < numCrossovers) {
      positions.add(randomRange(1, length - 1));
    }
    return Array.from(positions).sort((a, b) => a - b);
  }

  private createRecombinedChromosome(
    maternal: Chromosome,
    paternal: Chromosome,
    crossoverPositions: number[],
    length: number
  ): Chromosome {
    const result = new ChromosomeImpl(length);
    let useMaternal = Math.random() < 0.5;
    let currentPos = 0;
    
    for (const crossPos of [...crossoverPositions, length]) {
      const source = useMaternal ? maternal : paternal;
      
      // Copy segment
      for (let i = currentPos; i < crossPos; i++) {
        result.markers[i] = source.markers[i];
        result.origins[i] = source.origins[i];
      }
      
      useMaternal = !useMaternal;
      currentPos = crossPos;
    }
    
    return result;
  }
}