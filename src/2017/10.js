import fp from 'lodash/fp';

export const parseInput = input => input.split(',').map(x => +x);

const hashState = ring => ({ cursor: 0, ring, skip: 0 });
const hashFn = (acc, length) => {
	const offset = acc.cursor + length;
	for (let i = 0; i < Math.floor(length / 2); i++) {
		const toSwapIdx = (offset - i - 1) % acc.ring.length;
		const swapWith = (acc.cursor + i) % acc.ring.length;
		const x = acc.ring[toSwapIdx];
		acc.ring[toSwapIdx] = acc.ring[swapWith];
		acc.ring[swapWith] = x;
	}
	acc.cursor = (acc.cursor + length + acc.skip) % acc.ring.length;
	acc.skip++;
	return acc;
};

export const part1 = (ringSize, lengths) => {
	const res = lengths.reduce(hashFn, hashState(fp.range(0, ringSize)));
	return res.ring[0] * res.ring[1];
};

export const denseHash = sparseHash => sparseHash.reduce(
	(acc, x, i) => {
		acc.working ^= x;
		if (i % 16 === 15) {
			acc.hash.push(acc.working);
			acc.working = 0;
		}
		return acc;
	},
	{ hash: [], working: 0 }
);

export const toHexChar = x => {
	const str = x.toString(16);
	return str.length === 1 ? `0${str}` : str;
}
export const toHex = arr => arr.reduce((acc, x) => acc.concat(toHexChar(x)), '');

export const part2 = input => {
	const salt = [17, 31, 73, 47, 23];
	const lengths = input.trim().split('').map(x => +x.charCodeAt(0)).concat(salt);
	let acc = hashState(fp.range(0, 256));
	for (let i = 0; i < 64; i++) {
		acc = lengths.reduce(hashFn, acc);
	}

	return toHex(denseHash(acc.ring).hash);
};
