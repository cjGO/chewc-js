import Allele from '../models/allele';
import Chromosome from '../models/chromosome';

describe('Chromosome', () => {
    test('should create a chromosome with correct properties', () => {
        const alleles = [
            new Allele(0, 1, 1, 10.5),
            new Allele(1, 1, 1, 20.3)
        ];
        
        const chromosome = new Chromosome(1, alleles);
        
        expect(chromosome.id).toBe(1);
        expect(chromosome.alleles).toHaveLength(2);
        expect(chromosome.alleles).toEqual(alleles);
    });

    test('should create an empty chromosome when no alleles provided', () => {
        const chromosome = new Chromosome(1);
        
        expect(chromosome.id).toBe(1);
        expect(chromosome.alleles).toHaveLength(0);
    });
});

