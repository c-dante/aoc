import fp from 'lodash/fp';

export const parseInput = input => input.split(',').map(x => +x);

export const part1 = (ringSize, lengths) => {
	const res = lengths.reduce(
		(acc, length, skip) => {
			const offset = acc.cursor + length;
			for (let i = 0; i < Math.floor(length / 2); i++) {
				const toSwapIdx = (offset - i - 1) % acc.ring.length;
				const swapWith = (acc.cursor + i) % acc.ring.length;
				const x = acc.ring[toSwapIdx];
				acc.ring[toSwapIdx] = acc.ring[swapWith];
				acc.ring[swapWith] = x;
			}
			acc.cursor = (acc.cursor + length + skip) % acc.ring.length;
			return acc;
		},
		{ cursor: 0, ring: fp.range(0, ringSize) }
	);

	return res.ring[0] * res.ring[1];
};

// export const part2 = input => {};
