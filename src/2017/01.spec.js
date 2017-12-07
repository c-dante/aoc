import { assert } from 'chai';
import * as src from './01';
import problemInput from './01.data';

describe('--- Day 1: Inverse Captcha ---', () => {
	describe('Part 1', () => {
		it('should pass the problem examples', () => {
			assert.equal(src.part1('1122'), 3);
			assert.equal(src.part1('1111'), 4);
			assert.equal(src.part1('1234'), 0);
			assert.equal(src.part1('91212129'), 9);
		});

		it('should give the correct answer for the problem input', () => {
			assert.equal(src.part1(problemInput), 1097);
		});
	});

	describe('Part 2', () => {
		it('should pass the problem examples', () => {
			assert.equal(src.part2('1212'), 6);
			assert.equal(src.part2('1221'), 0);
			assert.equal(src.part2('123425'), 4);
			assert.equal(src.part2('123123'), 12);
			assert.equal(src.part2('12131415'), 4);
		});

		it('should give the correct answer for the problem input', () => {
			assert.equal(src.part2(problemInput), 1188);
		});
	});
});
