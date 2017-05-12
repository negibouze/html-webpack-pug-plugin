// Webpack require:
var partial = require('./_partial.slim');
var universal = require('./universial.js');

// Export a function / promise / or a string:
module.exports = universal() + new Date().toISOString() + partial;
