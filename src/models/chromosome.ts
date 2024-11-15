import Allele from "./allele";

class Chromosome {
    id: number;
    alleles: Allele[];
    
    constructor(id: number, alleles: Allele[] = []) {
        this.id = id;
        this.alleles = alleles;
    }
}

export default Chromosome;