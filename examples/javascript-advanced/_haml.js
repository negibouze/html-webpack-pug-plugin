// Webpack require:
var partial = require('./_partial.haml');
var universal = require('./universial.js');

// Export a function / promise / or a string:
// This function has to return a string or promised string:
module.exports = function (templateParams) {
  var template = '!!! 5\
%html{ :lang => "en" }\
  %head\
    %meta{ :charset => "utf-8" }\
    %title ' + templateParams.htmlWebpackPlugin.options.title + '\
    %meta{ :name => "viewport", :content => "width=device-width, initial-scale=1" }\
  %body\
    ' + universal() + ' - ' + partial;

  return template;
};
