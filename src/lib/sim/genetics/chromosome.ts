import { founderIdGenerator } from "../utils";

export interface Chromosome {
    readonly markers: Uint8Array;
    readonly origins: Uint32Array;
}

export class ChromosomeImpl implements Chromosome {

	readonly markers: Uint8Array;
    readonly origins: Uint32Array;

    constructor(numMarkers: number) {
        this.markers = new Uint8Array(numMarkers);
        this.origins = new Uint32Array(numMarkers);
    }

    static create(numMarkers: number): Chromosome {
        const chromosome = new ChromosomeImpl(numMarkers);
        const founderId = founderIdGenerator.next();
        
        crypto.getRandomValues(chromosome.markers);
        
        for (let i = 0; i < numMarkers; i++) {
            chromosome.markers[i] = chromosome.markers[i] & 1;
        }
        
        chromosome.origins.fill(founderId);
        
        return chromosome;
    }
}