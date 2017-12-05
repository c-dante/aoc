const blockToLines = block => block.split('\n');
const lineToTokens = line => line.split(' ');
const validatePassphrase = tokens => (new Set(tokens)).size === tokens.length;

// Part 1
const go = (input) => blockToLines(input).map(lineToTokens).filter(validatePassphrase).length

// Part 2
const formatTokens = tokens => tokens.map(token => token.split("").sort().join(""))
const go2 = (input) => blockToLines(input).map(lineToTokens).map(formatTokens).filter(validatePassphrase).length

