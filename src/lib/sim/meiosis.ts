import type { Individual } from './individual';
import type { Chromosome } from './chromosome';

/**
 * Simulates meiosis by creating a new chromosome with crossovers between maternal and paternal chromosomes
 * @param parent The parent individual whose chromosomes will undergo meiosis
 * @returns A new Chromosome representing the result of meiosis
 */
export function meiosis(parent: Individual): Chromosome {
    // Helper function to sample from Poisson distribution with lambda = 1.5
    function samplePoisson(lambda: number = 1.5): number {
        const L = Math.exp(-lambda);
        let k = 0;
        let p = 1;
        
        do {
            k++;
            p *= Math.random();
        } while (p > L);
        
        return k - 1;
    }

    // Get the number of crossover points (between 0-3)
    const numCrossovers = Math.min(3, samplePoisson());
    
    // Get chromosome length from parent
    const chromosomeLength = parent.maternalChromosome.markers.length;
    
    // Generate crossover positions
    const crossoverPositions = new Set<number>();
    while (crossoverPositions.size < numCrossovers) {
        const position = Math.floor(Math.random() * (chromosomeLength - 1)) + 1;
        crossoverPositions.add(position);
    }
    
    // Sort crossover positions
    const sortedPositions = Array.from(crossoverPositions).sort((a, b) => a - b);
    
    // Initialize result arrays
    const resultMarkers: number[] = [];
    const resultOrigins: number[] = [];
    
    // Start with randomly choosing maternal or paternal chromosome
    let useMaternal = Math.random() < 0.5;
    let currentPos = 0;
    
    // Process segments between crossover points
    for (const crossPos of [...sortedPositions, chromosomeLength]) {
        const sourceChromosome = useMaternal ? 
            parent.maternalChromosome : 
            parent.paternalChromosome;
            
        // Copy segment from current position to crossover point
        for (let i = currentPos; i < crossPos; i++) {
            resultMarkers.push(sourceChromosome.markers[i]);
            resultOrigins.push(sourceChromosome.origins[i]);
        }
        
        // Switch chromosomes at crossover point
        useMaternal = !useMaternal;
        currentPos = crossPos;
    }
    
    // Explicitly create and return a Chromosome object
    const result: Chromosome = {
        markers: resultMarkers,
        origins: resultOrigins
    };
    
    return result;
}
