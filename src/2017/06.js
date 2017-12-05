const jumpPc = (strip, idx = 0) => {
	let steps = 0;
	while (idx > 0 && idx < strip.length) {
		const next = strip[idx];
		strip[idx]++;
		idx += next;
		steps++;
	}
	return steps;
};

