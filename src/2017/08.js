import fp from 'lodash/fp';

const log = x => {
	console.log(x);
	return x;
};

const bindExec = (register, cmd, amount) => {
	switch (cmd) {
		case 'inc': return pgm => {
			pgm.registers[register] += amount;
			return pgm.registers[register];
		};
		case 'dec': return pgm => {
			pgm.registers[register] -= amount;
			return pgm.registers[register];
		};
		default: throw new Error(`Unknown exec: ${cmd}`);
	}
};

const bindCond = (register, cmd, amount) => {
	switch (cmd) {
		case '>': return pgm => pgm.registers[register] > amount;
		case '<': return pgm => pgm.registers[register] < amount;
		case '<=': return pgm => pgm.registers[register] <= amount;
		case '>=': return pgm => pgm.registers[register] >= amount;
		case '!=': return pgm => pgm.registers[register] != amount;
		case '==': return pgm => pgm.registers[register] === amount;
		default: throw new Error(`Unknown cond: ${cmd}`);
	}
}

/**
 * @typedef {Object} Command
 * @prop {Function(Program): Void} exec
 * @prop {Function(Program): Boolean} cond
 */
const command = (exec, cond) => ({ exec, cond });

/**
 * @typedef {Object} Program
 * @prop {Object<String, Number>} registers
 * @prop {Command[]} cmds - Commands of the program
 * @prop {Number} maxEver - Highest register value during exec
 */
const program = ({
	registers = {},
	cmds = [],
} = {}) => ({ registers, cmds, maxEver: Number.NEGATIVE_INFINITY });

/**
 * @param {String} input
 * @returns {Program}
 */
export const parseInput = fp.flow(
	// Split to lines
	fp.split('\n'),
	fp.filter(fp.identity),
	// Not curried because I want a new program each time
	x => fp.reduce((pgm, line) => {
		// Parse the line
		const [,
			execReg, execCmd, execAmount,
			condReg, condCmd, condAmount
		] = /(\w+)\s+(\w+)\s(\-?\d+)\s+if\s+(\w+)\s+([!><=]+)\s+(\-?\d+)/.exec(line).map(fp.trim);

		// Insert the command
		pgm.cmds.push(command(
			bindExec(execReg, execCmd, +execAmount),
			bindCond(condReg, condCmd, +condAmount)
		));
		
		// Ensure the register exists
		pgm.registers[execReg] = 0;
		pgm.registers[condReg] = 0;
		return pgm;
	}, program(), x),
);

const runProgram = x => x.cmds.reduce((pgm, cmd) => {
	if (cmd.cond(pgm)) {
		pgm.maxEver = Math.max(pgm.maxEver, cmd.exec(pgm));
	}
	return pgm;
}, x);

/**
 * Run a program at a given instruction
 * and return the highest value register
 * @param {Program} pgm 
 * @returns {Number}
 */
export const part1 = fp.flow(
	runProgram,
	fp.get('registers'),
	fp.toPairs,
	fp.maxBy(fp.get(1)),
	fp.get(1)
);

/**
 * Run a program at a given instruction
 * and return the highest value EVER
 * @param {Program} pgm 
 * @returns {Number}
 */
export const part2 = fp.flow(
	runProgram,
	fp.get('maxEver')
)