"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Allele {
    constructor(value, source, chromosome, cm_location) {
        this.value = value;
        this.source = source;
        this.chromosome = chromosome;
        this.cm_location = cm_location;
    }
}
exports.default = Allele;
