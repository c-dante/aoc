const jumpPc = adjuster => (strip, idx = 0) => {
	let steps = 0;
	const myStrip = strip.slice();
	while (idx >= 0 && idx < myStrip.length) {
		const next = myStrip[idx];
		myStrip[idx] = adjuster(myStrip[idx], idx, steps);
		idx += next; // eslint-disable-line no-param-reassign
		steps++;
	}
	return steps;
};

export const part1 = jumpPc(x => x + 1);

export const part2 = jumpPc(x => (x >= 3 ? x - 1 : x + 1));
