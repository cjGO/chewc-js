// src/lib/sim/genetics/genetic-map.ts

export interface GeneticMap {
    readonly positions: Float64Array;  // Positions in centimorgans
    readonly isRandomized: boolean;    // Whether positions were randomly generated
}

export class GeneticMapImpl implements GeneticMap {
    readonly positions: Float64Array;
    readonly isRandomized: boolean;

    private constructor(positions: Float64Array, isRandomized: boolean) {
        this.positions = positions;
        this.isRandomized = isRandomized;
    }

    /**
     * Creates a linear genetic map with evenly spaced markers
     * @param numMarkers Number of markers
     * @param totalLength Total map length in centimorgans
     */
    static createLinear(numMarkers: number, totalLength: number = 100): GeneticMap {
        const positions = new Float64Array(numMarkers);
        const interval = totalLength / (numMarkers - 1);
        
        for (let i = 0; i < numMarkers; i++) {
            positions[i] = i * interval;
        }

        return new GeneticMapImpl(positions, false);
    }

    /**
     * Creates a randomized genetic map with non-uniform marker spacing
     * @param numMarkers Number of markers
     * @param totalLength Total map length in centimorgans
     */
    static createRandomized(numMarkers: number, totalLength: number = 100): GeneticMap {
        const positions = new Float64Array(numMarkers);
        
        // Generate random positions and sort them
        for (let i = 0; i < numMarkers; i++) {
            positions[i] = Math.random() * totalLength;
        }
        positions.sort();

        return new GeneticMapImpl(positions, true);
    }

    /**
     * Calculate genetic distance between two markers
     * @param pos1 Index of first marker
     * @param pos2 Index of second marker
     */
    static getDistance(map: GeneticMap, pos1: number, pos2: number): number {
        return Math.abs(map.positions[pos2] - map.positions[pos1]);
    }
}

