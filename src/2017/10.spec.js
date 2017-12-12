import { assert } from 'chai';
import * as src from './10';
import problemInput from './10.data';

describe('--- Day 10: Knot Hash ---', () => {
	describe('Part 1', () => {
		it('should work for test data', () => {
			const testInput = [3, 4, 1, 5];
			assert(src.part1(5, testInput), 12);
		});
		
		it('should work for problem input', () => {
			const parsed = src.parseInput(problemInput);
			assert(src.part1(256, parsed), 11413);
		});
	});
	
	describe('Part 2', () => {
		it('should work for test data');

		it('should work for problem input');
	});
})
