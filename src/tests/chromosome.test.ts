import Allele from '../models/allele';
import Chromosome from '../models/chromosome';

describe('Chromosome', () => {
    test('should create chromosome with segments', () => {
        const alleles = [
            new Allele(0, 1, 1, 45.5),
            new Allele(1, 1, 1, 50.2)
        ];
        const chromosome = new Chromosome(alleles);
        
        chromosome.addSegment(0, 1);  // Start position 0cM, from parent 1
        chromosome.addSegment(45.5, 2);  // Crossover at 45.5cM, from parent 2
        
        expect(chromosome.segments.length).toBe(2);
        expect(chromosome.segments[0].originId).toBe(1);
        expect(chromosome.segments[1].startPosition).toBe(45.5);
    });
});