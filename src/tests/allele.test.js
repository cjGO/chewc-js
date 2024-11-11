"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allele_1 = __importDefault(require("../models/allele"));
describe('Allele', () => {
    test('should create an allele with correct properties', () => {
        const allele = new allele_1.default(0, 'parent1', '1A', 45.5);
        expect(allele.value).toBe(0);
        expect(allele.source).toBe('parent1');
        expect(allele.chromosome).toBe('1A');
        expect(allele.cm_location).toBe(45.5);
    });
});
