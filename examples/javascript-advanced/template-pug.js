// Webpack require:
var partial = require('html-loader?-minimize!./partial.pug');
var universal = require('./universial.js');

// Export a function / promise / or a string:
// This function has to return a string or promised string:
module.exports = function (templateParams) {
  var template = 'doctype html\n\
html(lang="en")\n\
  head\n\
    meta(charset="utf-8")\n\
    title ' + templateParams.htmlWebpackPlugin.options.title + '\n\
    meta(content="width=device-width, initial-scale=1" name="viewport")\n\
  body\n\
    ' + universal() + ' - \n' + partial;

  return template;
};
