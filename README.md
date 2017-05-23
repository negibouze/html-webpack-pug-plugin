Pug/Jade extension for the HTML Webpack Plugin
========================================

Notice
------------
Slim and Haml are not supported since version0.1.0.  
If you are using this package with Slim or Haml, please change to these packages.

Slim: [html-webpack-slim-plugin](https://www.npmjs.com/package/html-webpack-slim-plugin)  
Haml: [html-webpack-haml-plugin](https://www.npmjs.com/package/html-webpack-haml-plugin)

Installation
------------
Install the plugin with npm:

```shell
$ npm install --save-dev html-webpack-pug-plugin
```

Install the plugin with yarn:

```shell
$ yarn add --dev html-webpack-pug-plugin
```

Usage
-----
Require the plugin in your webpack config:

```javascript
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
```

ES2015

```es2015
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
```

Add the plugin to your webpack config as follows:

```javascript
// Please specify filetype 'pug' or filename '*.pug'.
plugins: [
  new HtmlWebpackPlugin({
    filetype: 'pug'
  }),
  new HtmlWebpackPlugin({
    filename: 'output.pug'
  }),
  new HtmlWebpackPugPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackPugPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/views/test.pug',
    filetype: 'pug'
  }),
  new HtmlWebpackPlugin({
    template: 'src/views/test.pug',
    filename: 'test.pug'
  }),
  new HtmlWebpackPugPlugin()
]  
```

Output Example
--------------

Pug/Jade

```pug
doctype html
html
  head
    meta(charset="utf-8")
    link(href="bundle.css" rel="stylesheet")
  body
    script(type="text/javascript" src="bundle.js")
```

If you are interested, look at examples.

License
-------

This project is licensed under [MIT](https://github.com/negibouze/html-webpack-pug-plugin/blob/master/LICENSE).
