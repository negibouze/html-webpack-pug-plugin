'use strict';

var assert = require('assert');

class HtmlWebpackPugPlugin {
  /**
   * @param {HtmlWebpackOptions} [options]
   */
  constructor (options) {
    this.options = Object.assign({
      ast: false,
      adjustIndent: false
    }, options);
  }

  apply (compiler) {
    var pluginName = 'HtmlWebpackPugPlugin';
    var self = this;
    // Hook into the html-webpack-plugin processing
    var beforeAssetsInjection = function (htmlPluginData, callback) {
      self.preProcessHtml(htmlPluginData, callback);
    }
    var afterAssetsInjection = function (htmlPluginData, callback) {
      self.postProcessHtml(htmlPluginData, callback);
    }
    // Webpack 4+
    if (compiler.hooks) {
      compiler.hooks.compilation.tap(pluginName, function (compilation) {
        var myHooks = (function (comp) {
          if (comp.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
            // HtmlWebPackPlugin 3.x
            return [
              { hook: comp.hooks.htmlWebpackPluginBeforeHtmlProcessing, func: beforeAssetsInjection},
              { hook: comp.hooks.htmlWebpackPluginAfterHtmlProcessing, func: afterAssetsInjection},
            ];
          } else {
            // HtmlWebPackPlugin 4.x
            var HtmlWebpackPlugin = require('html-webpack-plugin');
            var hooks = HtmlWebpackPlugin.getHooks(comp);
            return [
              { hook: hooks.afterTemplateExecution, func: beforeAssetsInjection},
              { hook: hooks.beforeEmit, func: afterAssetsInjection},
            ];
          }
        })(compilation);
        myHooks.forEach(function (v) {
          v.hook.tapAsync(pluginName, v.func);
        })
      });
    } else {
      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', beforeAssetsInjection);
        compilation.plugin('html-webpack-plugin-after-html-processing', afterAssetsInjection);
      });
    }
  };
  
  /**
   * Is it no longer supported
   * @param htmlPluginData
   * @return bool no longer supported -> true
   */
  isNoLongerSupported (htmlPluginData) {
    var target = ['haml', 'slim'];
    var ext = htmlPluginData.outputName.split('.').pop();
    var fileType = htmlPluginData.plugin.options.filetype;
    // If the plugin configuration set `filename` extension or `filetype` to ('haml' or 'slim')
    return target.indexOf(ext) >= 0 || target.indexOf(fileType) >= 0;
  };
  
  /**
   * Is it processing target
   * @param htmlPluginData
   * @return bool processing target -> true
   */
  isProcessingTarget (htmlPluginData) {
    var target = ['pug', 'jade'];
    var ext = htmlPluginData.outputName.split('.').pop();
    var fileType = htmlPluginData.plugin.options.filetype;
    // If the plugin configuration set `filename` extension or `filetype` to ('pug' or 'jade')
    return target.indexOf(ext) >= 0 || target.indexOf(fileType) >= 0;
  };
  
  /**
   * Process the generated HTML（before assets injection）
   */
  preProcessHtml (htmlPluginData, callback) {
    var self = this;
    if (self.isNoLongerSupported(htmlPluginData)) {
      var message = '\
Sorry, Slim and Haml are no longer supported.\n\
Please change to these packages.\n\
\n\
Slim: [html-webpack-slim-plugin](https://www.npmjs.com/package/html-webpack-slim-plugin)\n\
Haml: [html-webpack-haml-plugin](https://www.npmjs.com/package/html-webpack-haml-plugin)';
      throw new Error(message);
    }
    if (self.isProcessingTarget(htmlPluginData)) {
      // do not minify
      htmlPluginData.plugin.options.minify = false;
      htmlPluginData.html = self.deleteExtraNewlines(htmlPluginData.html);
      if (this.options.adjustIndent) {
        htmlPluginData.html = self.adjustElementsIndentation(htmlPluginData.html);
      }
    }
    callback(null, htmlPluginData);
  };
  
  /**
   * Process the generated HTML（after assets injection）
   */
  postProcessHtml (htmlPluginData, callback) {
    var self = this;
    var options = htmlPluginData.plugin.options;
    // If the plugin configuration set `inject` to true and (set `filename` extension or `filetype` to ('pug' or 'jade'))
    if (options.inject && self.isProcessingTarget(htmlPluginData)) {
      if (options.filename === 'index.html') {
        var filename = 'index.' + options.filetype;
        htmlPluginData.outputName = filename;
        htmlPluginData.plugin.childCompilationOutputName = filename;
        htmlPluginData.plugin.options.filename = filename;
      }
      htmlPluginData.html = self.injectAssetsIntoFile(htmlPluginData);
    }
    callback(null, htmlPluginData);
  };
 
  /**
   * Adjust elements indentation
   * @param html htmlPluginData.html (pug)
   */
  adjustElementsIndentation (html) {
    var self = this;
    html = self.adjustHeadElementsIndentation(html);
    html = self.adjustBodyElementsIndentation(html);
    return html;
  };
 
  /**
   * Delete trailing extra newlines
   * e.g.
   *  before
   *   #footer
   *     Footer content
   *
   *
   *  after
   *   #footer
   *     Footer content
   *
   * @param html htmlPluginData.html (Pug/Jade)
   */
  deleteExtraNewlines (html) {
    return html.replace(/(\r?\n){2,}$/im, '$1');
  }

  /**
   * Adjust head elements indentation
   * e.g.
   *  before
   *    head
   *        meta(charset="utf-8")
   *        meta(http-equiv="X-UA-Compatible" content="IE=edge")
   *    meta(name="viewport" content="width=device-width, initial-scale=1")
   *    meta(name="description" content="Webpack App")
   *        title
   *            block title
   *  after
   *    head
   *        meta(charset="utf-8")
   *        meta(http-equiv="X-UA-Compatible" content="IE=edge")
   *        meta(name="viewport" content="width=device-width, initial-scale=1")
   *        meta(name="description" content="Webpack App")
   *        title
   *            block title
   * @param html htmlPluginData.html (Pug/Jade)
   */
  adjustHeadElementsIndentation (html) {
    var regExp = /^(([ |\t]*)html.*\n)(([ |\t]*)head\n)([ |\t]*[\s\S]*)(\n[ |\t]*body)/im;
    var match = regExp.exec(html);
    if (match) {
      var nextIndent = match[4].repeat(2).replace(match[2], '');
      var elements = match[5].split('\n').map(function(v) {
        if (/^[ |\t]*(title|style|meta|link|script|base)/.test(v)) {
          return v.replace(/^[ |\t]*/, nextIndent).replace(/[ |　|\t]+$/, '');
        }
        return v;
      });
      html = html.replace(regExp, match[1] + match[3] + elements.join('\n') + match[6]);
    }
    return html;
  }

  /**
   * Adjust body elements indentation
   * !Operation guarantee of this function is limited
   * e.g.
   *  before
   *      body#body.main
   *        h1 Main
   *        img(src="logo.png")
   *        h1 Pug - node template engine
   *    #container.col
   *      if youAreUsingPug
   *        p You are amazing
   *      else
   *        p Get on it!
   *      p.
   *        Pug is a terse and simple templating language with a
   *        strong focus on performance and powerful features.
   *    #footer
   *      Footer content
   *  after
   *      body#body.main
   *        h1 Main
   *        img(src="logo.png")
   *        h1 Pug - node template engine
   *        #container.col
   *          if youAreUsingPug
   *            p You are amazing
   *          else
   *            p Get on it!
   *          p.
   *            Pug is a terse and simple templating language with a
   *            strong focus on performance and powerful features.
   *        #footer
   *          Footer content
   * @param html htmlPluginData.html (Pug/Jade)
   */
  adjustBodyElementsIndentation (html) {
    var regExp = function(html) {
      var h = /^([ |\t]*)head/im.exec(html);
      var topSpace = h ? h[1] : '[ |\t]*';
      return new RegExp('^(' + topSpace + ')(body.*\\n)([ |\t]*[\\s\\S]*)', 'im');;
    }(html);
    var match = regExp.exec(html);
    if (match) {
      var padding = false;
      var indent = match[1];
      var addIndent = indent.repeat(2);
      var elements = match[3].split('\n');
      var newElements = [];
      for (var i = 0; i < elements.length; i++) {
        var elm = elements[i];
        // Skip first element
        if (i === 0) {
          newElements.push(elm);
          continue;
        }
        // Skip blank element
        if (elm.trim() === '') {
          newElements.push(elm.trim());
          continue;
        }
        var m = /^([ |\t]*).*$/i.exec(elm);
        // If the indentation is shallower than the body
        if (padding || (m && (m[1].length < indent.length))) {
          // After that, add indentation to all elements
          padding = true;
          elm = addIndent + elm;
        }
        newElements.push(elm);
      }
      html = html.replace(regExp, match[1] + match[2] + newElements.join('\n'));
    }
    return html;
  }

  /**
   * Create a tag of pug format
   */
  createPugTag (tag) {
    if (tag.search(/=['"]/i) === -1) { return tag };
    return tag.replace(' ', '(') + ')';
  };
  
  /**
   * Injects the assets into the given file string
   */
  injectAssetsIntoFile (htmlPluginData) {
    var self = this;
    var options = htmlPluginData.plugin.options;
    var assets = self.getAssets(htmlPluginData);
    var html = htmlPluginData.html;
    var hasTemplate = self.hasTemplate(options.template);
    if (!hasTemplate) {
      html = html.replace(/\r?\n[ ]*/g, '');
    }
  
    var styles = self.headExtraction(html).map(function (e) {
      return e.match(/title>.*<\/title/i) ? 'title ' + options.title : e;
    });
    var scripts = htmlPluginData.plugin.options.inject !== 'head' ? self.bodyExtraction(html) : [];
    var file = hasTemplate ? self.removeUnnecessaryTags(html) : self.defaultTemplate();
  
    styles = styles.map(self.createPugTag);
    scripts = scripts.map(self.createPugTag);
  
    return this.options.ast
      ? self.injectAssetsUsingAST (file, styles, scripts, assets, options.inject)
      : self.injectAssets(file, styles, scripts, assets);
  };
  
  /**
   * Is a valid template file set
   * @param filename template file name
   */
  hasTemplate (filename) {
    var ext = filename.split('.').pop();
    return ['pug', 'jade', 'js'].indexOf(ext) >= 0;
  };
  
  /**
   * Default template
   */
  defaultTemplate () {
    return '\
doctype html\n\
html\n\
  head\n\
  body';
  };
  
  /**
   * Get Assets
   * @param html htmlPluginData
   */
  getAssets (htmlPluginData) {
    if (htmlPluginData.assets) {
      return htmlPluginData.assets;
    }
    return (function (str) {
      var regExp = /([\w-]*\.appcache)/i;
      var match = regExp.exec(str);
      if (!match || match.length < 2) {
        return undefined;
      }
      return { manifest: match[1] };
    })(htmlPluginData.plugin.assetJson);
  };
  
  /**
   * Extract the style tags from head
   * @param html htmlPluginData.html (Pug/Jade)
   */
  headExtraction (html) {
    var regExp = /<head><(.*)><\/head>/i;
    var match = regExp.exec(html);
    if (!match || match.length < 2) {
      return [];
    }
    return match[1].split('><').filter(function(v) { return !v.startsWith('/') });
  };
  
  /**
   * Extract the script tags from body
   * @param html htmlPluginData.html (Pug/Jade)
   */
  bodyExtraction (html) {
    var regExp = /<(script.*)><\/script>/i;
    var match = regExp.exec(html);
    if (!match || match.length < 2) {
      return [];
    }
    return match[1].split('></script><');
  };
  
  /**
   * Remove html format tags
   * @param html htmlPluginData.html (Pug/Jade)
   */
  removeUnnecessaryTags (html) {
    var headRegExp = /<head><(.*)><\/head>/i;
    var bodyRegExp = /<(script.*)><\/script>/i;
    return html.replace(headRegExp, '').replace(bodyRegExp, '');
  };
  
  /*******************
   Regular Expression
   *******************/
  
  /**
   * Injects the assets into the given string
   * @param html htmlPluginData.html (Pug/Jade)
   * @param head inject in the head tag (e.g. style tag)
   * @param body inject in the body tag (e.g. script tag)
   * @param manifest
   */
  injectAssets (html, head, body, assets) {
    var self = this;
    var regExp = function(html) {
      var h = /^([ |\t]*)head/im.exec(html);
      var topSpace = h ? h[1] : '[ |\t]*';
      return new RegExp('^(' + topSpace + ')(body)\\b', 'im');;
    }(html);
    var match = regExp.exec(html);
    if (match) {
      var headSpace = match[1];
      var hlSpace = function(space, html) {
        // delete extra space (left space of html tag)
        var m = /^([ |\t]*)html/im.exec(html);
        return m ? space.replace(m[1], '') : space;
      }(headSpace.repeat(2), html);
      if (head.length) {
        head = head.map(function(v) {
          return hlSpace + v;
        });
        if (!/head/.test(html)) {
          head = [headSpace + 'head'].concat(head)
        }
        // Append assets to head element
        html = html.replace(regExp, head.join('\n') + '\n' + match[0]);
      }
  
      if (body.length) {
        body = body.map(function(v) {
          return hlSpace + v;
        });
        // Append scripts to the end of the html:
        if (html[html.length-1] != '\n') {
          html += '\n'
        }
        html += body.join('\n');
      }
    }
  
    // Inject manifest into the opening html tag
    if (assets) {
      html = self.injectManifest(html, assets.manifest);
    }
    return html;
  };
  
  /**
   * Inject manifest into the opening html tag
   * @param html htmlPluginData.html (Pug/Jade)
   * @param manifest
   */
  injectManifest (html, manifest) {
    if (!manifest) {
      return html;
    }
    return html.replace(/^([ |\t]*html.*)$/im, function (match, p1) {
      // Append the manifest only if no manifest was specified
      if (/\smanifest\s*=/.test(match)) {
        return match;
      }
      var regExp = /^([ |\t]*html[^\(]*)(\([^\)]*)?(\))?$/i;
      var match = regExp.exec(p1);
      if (match) {
        var elements = match.filter(function(v) { return v != undefined });
        if (elements.length <= 3) {
          return elements[1] + '(manifest="' + manifest + '")';
        };
        return elements[1] + elements[2].trim() + ' manifest="' + manifest + '"' + elements[3];
      }
      return match;
    });
  };
  
  /**********
   AST
   **********/
  
   /**
   * Injects the assets into the given string usint AST.
   * @param html htmlPluginData.html (Pug/Jade)
   * @param head inject in the head tag (e.g. style tag)
   * @param body inject in the body tag (e.g. script tag)
   * @param manifest
   * @param inject htmlPluginData.plugin.options.inject
   */
  injectAssetsUsingAST (html, head, body, assets, inject) {
    var lexer = require('pug-lexer');
    var parser = require('pug-parser');
    var walk = require('pug-walk');
    var generater = require('pug-source-gen');
  
    var self = this;
    var ast = parser(lexer(html));
  
    var noHead = true;
    var noBody = true;
    walk(ast, function(node) {
      if (!node.name || node.type != 'Tag') {
        return;
      }
      if (node.name === 'head') {
        noHead = false;
      } else if (node.name === 'body') {
        noBody = false;
      }
    });
  
    if (inject === 'head' && noHead) {
      throw new Error('When inject is \'head\', the head tag is required.');
    }
  
    var injectTags = self.getInjectTags(head, body, inject, noHead, noBody, parser, lexer);
  
    walk(ast, function(node, replace) {
      if (node.name && node.type === 'Tag') {
        if (node.name === 'html') {
          if (assets) {
            var attrs = node.attrs;
            Object.keys(assets).forEach(function(key) {
              attrs.push({ name: key, val: '"' + assets[key] + '"', mustEscape: true });
            });
            node.attrs = attrs;
            replace(node);
          }
        }
        var key = node.name;
        if (injectTags[key]) {
          const block = node.block;
          block.nodes = block.nodes.concat(injectTags[key].nodes);
          node.block = block;
          replace(node);
        }
      }
      if (node.attrs && 1 <= node.attrs.length) {
        var attrs = node.attrs;
        Object.keys(attrs).forEach(function(key) {
          attrs[key].escaped = attrs[key].mustEscape;
        });
        node.attrs = attrs;
        replace(node);
      }
    });
  
    return generater(ast, { indentChar: self.getIndentChar(html) });
  }
  
  getInjectTags (head, body, inject, noHead, noBody, parser, lexer) {
    if (inject === 'head') {
      return { head: parser(lexer(head.join('\n'))) }
    }
    if (noHead || noBody) {
      var str = (head.concat(body || [])).join('\n');
      return { [noHead ? 'body': 'head']: parser(lexer(str)) }
    }
    return {
      head: parser(lexer(head.join('\n'))),
      body: parser(lexer(body.join('\n')))
    }
  }

  getIndentChar (html) {
    var regExp = /^[ |\t]*html.*\n([ |\t]*)[^( |\t)]/im;
    var match = regExp.exec(html);
    if (!match || match.length < 2) {
      return '  ';
    }
    return match[1];
  }
}

module.exports = HtmlWebpackPugPlugin;
