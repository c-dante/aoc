import { assert } from 'chai';
import * as src from './08';
import problemInput from './08.data';

const testInput = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

describe('--- Day 8: I Heard You Like Registers ---', () => {
	describe('Part 1', () => {
		it('should work for test data', () => {
			const pgm = src.parseInput(testInput);
			assert.equal(src.part1(pgm), 1);
		});
		
		it('should work for problem input', () => {
			const pgm = src.parseInput(problemInput);
			assert.equal(src.part1(pgm), 3880);
		});
	});
	
	describe('Part 2', () => {
		it('should work for test data');

		it('should work for problem input');
	});
})
