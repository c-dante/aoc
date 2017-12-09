const group = (start, end, depth) => ({ start, end, depth });

const stream = (input) => {
	const closedGroups = [];
	const openGroups = [];
	let garbageCount = 0;
	let garbage = false;
	for (let i = 0; i < input.length; i++) {
		const tok = input.charAt(i);
		if (tok === '!') {
			i++;
			continue;
		}
	
		if (garbage && tok === '>') {
			garbage = false;
			continue;
		}

		if (!garbage && tok === '<') {
			garbage = true;
			continue;
		}
	
		if (garbage) {
			garbageCount++;
			continue;
		}
	
		if (tok === '{') {
			openGroups.push(group(i, undefined, openGroups.length));
			continue;
		}
	
		if (tok === '}') {
			const grp = openGroups.pop();
			grp.end = i;
			closedGroups.push(grp);
			continue;
		}
	}

	return { closedGroups, garbageCount };
}

export const part1 = (input) => stream(input)
	.closedGroups
	.reduce((score, grp) => score + grp.depth + 1, 0);

export const part2 = (input) => stream(input).garbageCount;
