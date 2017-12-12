import { assert } from 'chai';
import * as src from './02';
import problemInput from './02.data';

describe('--- Day 2: Corruption Checksum ---', () => {
	describe('Part 1', () => {
		it('should work for problem input', () => {
			assert.equal(src.part1(problemInput), 51833);
		});
	});
	
	describe('Part 2', () => {
		it('should work for problem input', () => {
			assert.equal(src.part2(problemInput), 288);
		});
	});
})
