'use strict';

var assert = require('assert');

function HtmlWebpackPugPlugin (options) {
  assert.equal(options, undefined, 'The HtmlWebpackPugPlugin does not accept any options');
}

HtmlWebpackPugPlugin.prototype.apply = function (compiler) {
  var self = this;
  // Hook into the html-webpack-plugin processing
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
      self.postProcessHtml(htmlPluginData, callback);
    });
  });
};

/**
 * Writes an asset to disk
 */
HtmlWebpackPugPlugin.prototype.postProcessHtml = function (htmlPluginData, callback) {
  var self = this;
  var options = htmlPluginData.plugin.options;
  // Skip if the plugin configuration didn't set `inject` to true or didn't set `filetype`
  if (!options.inject || !options.filetype) {
    return callback(null);
  }
  htmlPluginData.html = self.injectAssetsIntoFile(htmlPluginData);
  callback(null, htmlPluginData);
};

/**
 * Injects the assets into the given file string
 */
HtmlWebpackPugPlugin.prototype.injectAssetsIntoFile = function (htmlPluginData) {
  var self = this;
  var html = htmlPluginData.html;
  var assets = htmlPluginData.assets

  var styles = self.headExtraction(html);
  var scripts = self.bodyExtraction(html);
  var file = self.removeUnnecessaryTags(html);

  switch (htmlPluginData.plugin.options.filetype) {
    case 'haml':
      return self.injectAssetsIntoHaml(file, styles, scripts, assets);
    case 'jade':
    case 'pug':
      return self.injectAssetsIntoPug(file, styles, scripts, assets);
    case 'slim':
      return self.injectAssetsIntoSlim(file, styles, scripts, assets);
    default:
      return html;
  }
};

/**
 * Extract the style tags from head
 */
HtmlWebpackPugPlugin.prototype.headExtraction = function (html) {
  var regExp = /<head><(.*)><\/head>/i;
  var match = regExp.exec(html);
  if (!match || match.length < 2) {
    return [];
  }
  return match[1].split('><');
};

/**
 * Extract the script tags from body
 */
HtmlWebpackPugPlugin.prototype.bodyExtraction = function (html) {
  var regExp = /<(script.*)><\/script>/i;
  var match = regExp.exec(html);
  if (!match || match.length < 2) {
    return [];
  }
  return match[1].split('></script><');
};

/**
 * Remove html format tags
 */
HtmlWebpackPugPlugin.prototype.removeUnnecessaryTags = function (html) {
  var headRegExp = /<head><(.*)><\/head>/i;
  var bodyRegExp = /<(script.*)><\/script>/i;
  return html.replace(headRegExp, '').replace(bodyRegExp, '');
};

/**
 * Create a tag of haml format
 */
HtmlWebpackPugPlugin.prototype.createHamlTag = function (tag) {
  return '%' + tag.split(' ').join(', :').replace(',', '{').replace(/=/g, ' => ') + ' }';
};

/**
 * Injects the assets into the given haml string
 */
HtmlWebpackPugPlugin.prototype.injectAssetsIntoHaml = function (file, styles, scripts, assets) {
  var self = this;
  var head = styles.map(self.createHamlTag);
  var body = scripts.map(self.createHamlTag);
  return self.injectAssets(file, head, body, assets);
};

/**
 * Create a tag of pug format
 */
HtmlWebpackPugPlugin.prototype.createPugTag = function (tag) {
  return tag.replace(' ', '(') + ')';
};

/**
 * Injects the assets into the given pug string
 */
HtmlWebpackPugPlugin.prototype.injectAssetsIntoPug = function (file, styles, scripts, assets) {
  var self = this;
  var head = styles.map(self.createPugTag);
  var body = scripts.map(self.createPugTag);
  return self.injectAssets(file, head, body, assets);
};

/**
 * Injects the assets into the given slim string
 */
HtmlWebpackPugPlugin.prototype.injectAssetsIntoSlim = function (file, styles, scripts, assets) {
  var self = this;
  return self.injectAssets(file, styles, scripts, assets);
};

/**
 * Injects the assets into the given string
 */
HtmlWebpackPugPlugin.prototype.injectAssets = function (file, head, body, assets) {
  var self = this;
  var bodyRegExp = /^( *)(%?body)\b/im;

  var match = bodyRegExp.exec(file);
  if (match) {
    var headSpace = match[1];
    var hlSpace = headSpace.repeat(2);
    if (head.length) {
      head = head.map(function(v) {
        return hlSpace + v;
      });
      if(!/head/.test(file))
          head = [headSpace + 'head'].concat(head)
      // Append assets to head element
      file = file.replace(bodyRegExp, head.join('\n') + '\n' + match[0]);
    }

    if (body.length) {
      body = body.map(function(v) {
        return hlSpace + v;
      });
      // Append scripts to the end of the file:
      if(file[file.length-1] != '\n')
          file += '\n'
      file += body.join('\n');
    }
  }

  // Inject manifest into the opening html tag
  // if (assets.manifest) {
  //   html = html.replace(/(%?html)/i, function (match, start) {
  //     // Append the manifest only if no manifest was specified
  //     if (/\smanifest\s*=/.test(match)) {
  //       return match;
  //     }
  //     return start + ' manifest="' + assets.manifest + '"' + end;
  //   });
  // }
  return file;
};

module.exports = HtmlWebpackPugPlugin;
