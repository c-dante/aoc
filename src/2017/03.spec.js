import { assert } from 'chai';
import * as src from './03';
import problemInput from './03.data';

describe('--- Day 3: Spiral Memory ---', () => {
	describe('Part 1', () => {
		it('should work for problem input', () => {
			assert.equal(src.part1(problemInput), 419);
		});
	});
	
	describe('Part 2', () => {
		it('should work for problem input', () => {
			assert.equal(src.part2(problemInput).nextVal, 295229);
		});
	});
})
