import { assert } from 'chai';
import * as src from './07';
import problemInput from './07.data';
import { parseInput } from './07';

const testInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

describe('--- Day 7: Recursive Circus ---', () => {
	describe('Part 1', () => {
		it('should work for test data', () => {
			const nodes = src.parseInput(testInput);
			assert.equal(src.part1(nodes), 'tknk');
		});
		
		it('should work for problem input', () => {
			const nodes = src.parseInput(problemInput);
			assert.equal(src.part1(nodes), 'ykpsek');
		});
	});
	
	describe('Part 2', () => {
		it('should work for test data', () => {
			const nodes = parseInput(testInput);
			assert.deepEqual(src.part2(nodes), {
				name: 'ugml',
				oldWeight: 68,
				correctWeight: 60,
			});
		});

		it('should work for problem input', () => {
			const nodes = parseInput(problemInput);
			assert.deepEqual(src.part2(nodes), {
				name: 'cumah',
				oldWeight: 1069,
				correctWeight: 1060,
			});
		});
	});
})
