import { assert } from 'chai';
import * as src from './04';
import problemInput from './04.data';

describe('--- Day 4: High-Entropy Passphrases ---', () => {
	describe('Part 1', () => {		
		it('should work for problem input', () => {
			assert.equal(src.part1(problemInput), 477);
		});
	});
	
	describe('Part 2', () => {
		it('should work for problem input', () => {
			assert.equal(src.part2(problemInput), 167);
		});
	});
})
