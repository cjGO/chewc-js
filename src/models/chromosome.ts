import Allele from "./allele";

class Chromosome {
    alleles: Allele[];
    // Represents segments of inherited chromosomes using position-origin lists
    segments: Array<{
        startPosition: number;  // cM position where segment starts
        originId: number;      // Source/founder ID this segment came from
    }>;

    constructor(alleles: Allele[] = []) {
        this.alleles = alleles;
        this.segments = [];
    }

    // Add a new segment during recombination
    addSegment(startPosition: number, originId: number) {
        this.segments.push({
            startPosition,
            originId
        });
    }
}

export default Chromosome