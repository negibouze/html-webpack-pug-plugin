// Webpack require:
var partial = require('./partial.html');
var universal = require('./universial.js');

// Export a function / promise / or a string:
module.exports = '<!DOCTYPE html>\n\
<html lang="en">\n\
  <body>\n\
    ' + universal() + new Date().toISOString() + '\n' + partial + '\
  </body>\
</html>';
