import { assert } from 'chai';
import * as src from './10';
import problemInput from './10.data';

describe('--- Day 10: Knot Hash ---', () => {
	describe('Part 1', () => {
		it('should work for test data', () => {
			const testInput = [3, 4, 1, 5];
			assert.equal(src.part1(5, testInput), 12);
		});
		
		it('should work for problem input', () => {
			const parsed = src.parseInput(problemInput);
			assert.equal(src.part1(256, parsed), 11413);
		});
	});
	
	describe('Part 2', () => {
		it('should dense hash', () => {
			const res = src.denseHash([65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22]);
			assert.equal(res.hash[0], 64);
			
			const resB = src.denseHash([65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22,11]);
			assert.equal(resB.hash[0], 64);
			assert.equal(resB.working, 11);
		});

		it('can hexify', () => {
			assert.equal(src.toHex([64, 7, 255]), '4007ff');
		})

		it('should work for test data', () => {
			assert.equal(src.part2(''), 'a2582a3a0e66e6e86e3812dcb672a272');
			assert.equal(src.part2('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd');
			assert.equal(src.part2('1,2,3'), '3efbe78a8d82f29979031a4aa0b16a9d');
			assert.equal(src.part2('1,2,4'), '63960835bcdc130f0b66d7ff4f6a5a8e');
		});

		it('should work for problem input', () => {
			assert.equal(src.part2(problemInput), '7adfd64c2a03a4968cf708d1b7fd418d');
		});
	});
})
