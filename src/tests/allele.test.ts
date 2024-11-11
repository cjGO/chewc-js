import Allele from '../models/allele';

describe('Allele', () => {
    test('should create an allele with correct properties', () => {
        const allele = new Allele(0, 'parent1', '1A', 45.5);
        
        expect(allele.value).toBe(0);
        expect(allele.source).toBe('parent1');
        expect(allele.chromosome).toBe('1A');
        expect(allele.cm_location).toBe(45.5);
    });
});