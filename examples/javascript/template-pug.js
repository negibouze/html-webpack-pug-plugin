// Webpack require:
var partial = require('html-loader!./partial.pug');
var universal = require('./universial.js');

// Export a function / promise / or a string:
module.exports = 'doctype html\n\
html(lang="en")\n\
  body\n\
    ' + universal() + new Date().toISOString() + '\n' + partial;