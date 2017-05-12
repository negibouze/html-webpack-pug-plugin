// Webpack require:
var partial = require('./_partial.slim');
var universal = require('./universial.js');

// Export a function / promise / or a string:
// This function has to return a string or promised string:
module.exports = function (templateParams) {
  var template = 'doctype html\
html lang="en"\
  head\
    meta charset="utf-8"\
    title ' + templateParams.htmlWebpackPlugin.options.title + '\
    meta content="width=device-width, initial-scale=1" name="viewport"\
  body\
    ' + universal() + ' - ' + partial;

  return template;
};
