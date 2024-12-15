class IdGenerator {
	private nextId: number = 1;

	reset(): void {
		this.nextId = 1;
	}

	next(): number {
		return this.nextId++;
	}
}

export const founderIdGenerator = new IdGenerator();
export const individualIdGenerator = new IdGenerator();
