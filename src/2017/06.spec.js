import { assert } from 'chai';
import * as src from './06';
import rawInput from './06.data';

const partInput = (input) => input.split('\t').map(x => +x);
const problemInput = partInput(rawInput);

describe('--- Day 6: Memory Reallocation ---', () => {
	describe('Part 1', () => {
		it('should work for problem input', () => {
			assert.deepEqual(src.part1(problemInput).steps, 5042);
		});
	});
	
	describe('Part 2', () => {
		it('should work for problem input', () => {
			assert.deepEqual(src.part2(problemInput), 1086);
		});
	});
});
