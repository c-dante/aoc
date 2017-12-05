// Part 1: convert a number to its (x, y) position on the grid
// The distance from "center" is Abs(x) + Abs(y)
// "edge sizes" are odds -- 1, 3, 5, 7, 9, .../

// ring# to edge size
const ringeToEdgeSize = ring => (ring * 2) - 1;

// Amount of numbers at each ring is:

// edge size = numbers included
// 1 => 1 = (2 * e + max(0, 2 * (e - 2))
// 3 => 8 = (2 * 3 + 2 = 8)
// 5 => 16 = (2 * 5 + 2*(5-2))

// So, given the edge size, we have the set of numbers:
// e => [e*e - (2*e + 2*(e-2) + 1, e*e] // we add 1 to offset obo error, making the lower bound inclusive as well
const rangeAtEdge = edge => edge === 1 ? [1,1] : [edge*edge - (2*edge + 2*(edge-2)) + 1, edge * edge];

// Given the range at a ring distance, we know the last value in the ring is the lower-right corner
// Assuming 1 is at (0, 0), and the lower-right corner of the first ring is at (1, 1), we know
// the lower-right corner for any ring is: (ring# - 1, ring# - 1), by our own def

// Given a number, search for the ring that contains it
const findRingSize = n => {
	if (n <= 0) return undefined;
	let ring = 0;
	let range = [];
	do {
		ring++;
		range = rangeAtEdge(ringeToEdgeSize(ring));
	} while (n < range[0] || n > range[1]);

	return { ring, range };
};

// Given a ring, return the "centers" of the ring
const centersOfRing = (ring) => {
	const edgeSize = ringeToEdgeSize(ring);
	const range = rangeAtEdge(edgeSize);
	// Lower right corner = end of ring, calc back by floor edge / 2
	const halfBack = Math.floor(edgeSize/2);
	const bottom = range[1] - halfBack;
	const edgeSizeObo = edgeSize - 1;
	return [
		bottom - 3*edgeSizeObo, // right
		bottom - 2*edgeSizeObo, // top
		bottom - edgeSizeObo, // left
		bottom, // bottom
	];
};

// Now the rest:
// Given a number:
const go = (n) => {
	// 1. find its ring
	const { ring } = findRingSize(n);
	
	// 2. get that ring's centers
	const centers = centersOfRing(ring);
	
	// 3. get the distance to the closest center
	const distToCenter = centers.reduce(
		(minD, center) => Math.min(minD, Math.abs(n - center)),
		Number.POSITIVE_INFINITY
	);
	
	// 4. distance to the middle is that + ring #
	return (ring - 1) + distToCenter;
};
