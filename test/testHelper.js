require('babel-core/register')({
	// Ignore libraries
	ignore: /node_modules/,
});

require('mocha/mocha');
// window.beforeEach = global.beforeEach;
// window.afterEach = global.afterEach;
