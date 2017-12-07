/* eslint-disable */

const jumpPc = adjuster => (strip, idx = 0) => {
	let steps = 0;
	while (idx >= 0 && idx < strip.length) {
		const next = strip[idx];
		strip[idx] = adjuster(strip[idx], idx, steps);
		idx += next;
		steps++;
	}
	return steps;
};

const jumpPcPart1 = jumpPc(x => x + 1);

const jumpPcPart2 = jumpPc(x => (x >= 3 ? x - 1 : x + 1));
