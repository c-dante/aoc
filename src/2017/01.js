const parseInput = input => String(input).split('');

/**
 * Takes in a string of numbers and produces the sum of any repeated digits
 *
 * @param {String} input
 * @returns {Number}
 */
export const part1 = (input) => parseInput(input).concat(input[0]).reduce(
	(acc, x) => {
		acc.sum += (x === acc.last) ? (+x) : 0;
		acc.last = x;
		return acc;
	},
	{ last: undefined, sum: 0 }
).sum;

/**
 * Same as part 1, except instead of matching the adjacent digit it matches half way around
 * the ring
 *
 * @param {String} input
 * @returns {Number}
 */
export const part2 = (input) => parseInput(input).reduce(
	(acc, x, i, col) => acc + (x === col[(i + col.length / 2) % col.length] ? +x : 0),
	0
);
