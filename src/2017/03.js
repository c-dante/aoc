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

// @todo: given a number, determine its ring index location
// @todo: given a number within a ring, determine its distance from the closest center point (doesn't matter)
// @todo: The distance from the center (steps to get to the end) is just distance to center of ring number
//
