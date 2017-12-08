import fp from 'lodash/fp';
/* eslint-disable */

// This is cute -- We're given [parent] -> [children] links and we're asked to build the DAG :3

/**
 * @typedef {Object} Node
 * @prop {String} name - The name of this node
 * @prop {Number} weight - Weight of this node
 * @prop {String[]} children - Names of the children
 */
const newNode = (name, weight, childrenNames) => ({ name, weight, childrenNames });

/**
 * Parses input of the form:
 * 
 * [name] (id) -> [name], [name], name
 * [name] (id) -> [name], [name], name
 * 
 * @param {String} input 
 * @returns {Node[]}
 */
export const parseInput = fp.flow(
	x => x.split('\n'),
	fp.map(fp.trim),
	fp.map(x => {
		const [ nodeAndWeight, rawChildren = '' ] = x.split('->');
		// console.log(nodeAndWeight);
		const [ , name, weight ] = /(\w+)\s*\((\d+)\)\s*/.exec(nodeAndWeight);
		const children = rawChildren.split(',').map(fp.trim).filter(fp.identity);
		return newNode(name, +weight, children);
	})
);

/**
 * Given a list of nodes, returns a mapping of child name -> parent name
 * @param {Node[]} nodes
 * @returns {Object.<Node.name, Node.name>}
 */
const childToParentMap = fp.flow(
	fp.map(node => node.childrenNames.map(name => [name, node.name])),
	fp.flatten,
	fp.fromPairs,
);

/**
 * Takes nodes and returns the bottom of the graph.
 * 
 * @param {Node[]} nodes 
 * @returns {String} - The bottom most node name
 */
export const part1 = nodes => {
	const parentMap = childToParentMap(nodes);
	// Pick a random node to start with
	let root = fp.sample(parentMap);
	while (parentMap[root]) {
		root = parentMap[root];
	}
	return root;
};

/**
 * @typedef {Node} CheckedNode
 * @prop {Number} totalWeight
 */

/**
 * @typedef {Object} Part2Answer
 * @prop {CheckedNode[]} nodes
 * @prop {String} unbalancedName
 * @prop {Number} correctWeight
 */

/**
 * Search for a bad node, return it with its corrected weight
 * @param {Node[]} nodes
 * @returns {Part2Answer}
 */
export const part2 = nodes => {
	const nodeMap = fp.keyBy('name', nodes);
	const rootName = part1(nodes);

	// Balance the nodes + return the corrected node
	let result;
	(function recurse(node){
		if (!node.childrenNames.length) {
			node.totalWeight = node.weight;
			return node;
		}

		const res = node.childrenNames.reduce((acc, cn) => {
			const child = nodeMap[cn];
			if (child.totalWeight === undefined) {
				recurse(child);
				acc.children.push(child);
				acc.total += child.totalWeight;
			}
			return acc;
		}, {
			children: [],
			total: 0,
		});
		
		// Update this node's total weight
		node.totalWeight = res.total + node.weight;
		
		// Run correctness check
		fp.flow(
			fp.groupBy('totalWeight'),
			fp.toPairs,
			// Pairs of [childWeight, count]
			x => {
				// If incorrect, solve fix + log it
				if (x.length > 1) {
					const sorted = fp.sortBy('1', x);
					const expected = +sorted[1][0];
					const recieved = +sorted[0][0];
					const wrongNode = sorted[0][1][0];
					
					// Fix it
					const correctWeight = wrongNode.weight + (expected - recieved);
					if (!result) {
						result = {
							name: wrongNode.name,
							oldWeight: wrongNode.weight,
							correctWeight,
						};
					}

					// Adjust weight
					wrongNode.totalWeight = res.total + correctWeight;
					wrongNode.weight = correctWeight;
				}
			}
		)(res.children);

	}(nodeMap[rootName]));

	return result;
};
