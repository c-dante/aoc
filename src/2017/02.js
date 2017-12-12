export const part1 = input => input.split("\n").map(
	line => line.split(/\s/).reduce(
		(acc, x) => [Math.min(acc[0], +x), Math.max(acc[1], +x)],
		[Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
	))
	.map(t => Math.abs(t[0] - t[1])
	).reduce((a, b) => a + b)

// Not as proud of this
const divis = (a, b) => a / b === Math.floor(a/b)
export const part2 = input => input.split("\n").map(
	line => {
		const nums = line.split(/\s/).map(x => +x);
		for (let i = 0; i < nums.length; i++) {
			for (let j = 0; j < nums.length; j++) {
				if (i === j) continue;
				if (divis(nums[i], nums[j])) return nums[i] / nums[j];
			}
		}
	}
).reduce((a, b) => a + b);

