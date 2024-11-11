class Allele {
    value: number;
    source: string;
    chromosome: string;
    cm_location: number;

    constructor(value: number, source: string, chromosome: string, cm_location: number) {
        this.value = value;
        this.source = source;
        this.chromosome = chromosome;
        this.cm_location = cm_location;
    }
}

export default Allele;