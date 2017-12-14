import { assert } from 'chai';
import * as src from './05';
import rawInput from './05.data';

const partInput = (input) => input.split('\n').map(x => +x);
const problemInput = partInput(rawInput);

describe('--- Day 5: A Maze of Twisty Trampolines, All Alike ---', () => {
	describe('Part 1', () => {
		it('should work for problem input', () => {
			assert.equal(src.part1([0, 3, 0, 1, -3]), 5);
		});
		
		it('should work for problem input', () => {
			assert.equal(src.part1(problemInput), 373160);
		});
	});
	
	describe('Part 2', () => {
		it('should work for problem input', () => {
			assert.equal(src.part2(problemInput), 26395586);
		});
	});
})
