// input from puzzle
const problemInput = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`;

// Test data:
const testInput = [0, 2, 7, 0];
const testExpected = [2, 4, 1, 2];

const parseInput = input => input.split(/\s/).map(x => +x);


// Part 1
// const registers = parseInput(problemInput);
const getIdx = (registers, i) => i % registers.length;
const toKey = registers => registers.join(',');
const distribute = (registers, idx) => {
	const x = registers[idx];
	registers[idx] = 0;
	for (let i = 0; i < x; i++) {
		registers[getIdx(registers, idx + i + 1)]++;
	}
	return registers;
};

const findMax = (registers) => registers.reduce(
	(acc, n, i) => {
		if (n > acc.max) {
			acc.max = n;
			acc.index = i;
		}
		return acc;
	},
	{ max: Number.NEGATIVE_INFINITY, index: -1 }
);

const findCycle = (registers) => {
	const reg = registers.slice();
	const states = new Set();
	let lastKey;
	let steps = 0;

	// Not garanteed to terminate...?
	while (!states.has(lastKey)) {
		steps++;
		states.add(lastKey);
		const min = findMax(reg);
		distribute(reg, min.index);
		lastKey = toKey(reg);
	}

	return { registers: reg, steps, states };
};


// After we find a cycle, how many until we cycle again? -- how big is that cycle?
const findCycle2 = (registers) => {
	const reg = registers.slice();
	const states = {};
	let lastKey;
	let steps = 0;
	
	// Not garanteed to terminate...?
	while (states[lastKey] === undefined) {
		states[lastKey] = steps;
		const min = findMax(reg);
		distribute(reg, min.index);
		steps++;
		lastKey = toKey(reg);
	}
	
	return { registers: reg, steps, states };
};


const cycleSize = (results) => results.steps - results.states[toKey(results.registers)];
