const go = (input) => String(input).split("").concat(input[0]).reduce(
	(acc, x) => {
		acc.sum += (x === acc.last) ? (+x) : 0;
		acc.last = x;
		return acc;
	},
	{ last: undefined, sum: 0 }
);

const go2 = (input) => String(input).split("").reduce(
	(acc, x, i, col) => acc + (x === col[(i + col.length / 2) % col.length] ? +x : 0),
	0
);

