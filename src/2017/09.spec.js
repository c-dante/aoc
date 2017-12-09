import { assert } from 'chai';
import * as src from './09';
import problemInput from './09.data';

describe('--- Day 9: Stream Processing ---', () => {
	describe('Part 1', () => {
		it('should work for test data', () => {
			assert.equal(src.part1('{}'), 1);
			assert.equal(src.part1('{{{}}}'), 6);
			assert.equal(src.part1('{{},{}}'), 5);
			assert.equal(src.part1('{{{},{},{{}}}}'), 16);
			assert.equal(src.part1('{<a>,<a>,<a>,<a>}'), 1);
			assert.equal(src.part1('{{<ab>},{<ab>},{<ab>},{<ab>}}'), 9);
			assert.equal(src.part1('{{<!!>},{<!!>},{<!!>},{<!!>}}'), 9);
			assert.equal(src.part1('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 3);
		});

		it('should work for problem input', () => {
			assert.equal(src.part1(problemInput), 12505);
		});
	});
	
	describe('Part 2', () => {
		it('should work for test data', () => {
			assert.equal(src.part2('<>'), 0);
			assert.equal(src.part2('<random characters>'), 17);
			assert.equal(src.part2('<<<<>'), 3);
			assert.equal(src.part2('<{!>}>'), 2);
			assert.equal(src.part2('<!!>'), 0);
			assert.equal(src.part2('<!!!>>'), 0);
			assert.equal(src.part2('<{o"i!a,<{i<a>'), 10);
		});

		it('should work for problem input', () =>{
			assert.equal(src.part2(problemInput), 6671);
		});
	});
})
