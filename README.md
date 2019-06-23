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

ES2015 or later

```javascript
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
```

Add the plugin to your webpack config as follows:

```javascript
// Please specify filename '*.pug'.
plugins: [
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
    filename: 'output.pug'
  }),
  new HtmlWebpackPlugin({
    template: 'src/views/test.pug',
    filename: 'test.pug'
  }),
  new HtmlWebpackPugPlugin()
]  
```

Options
-----
| Name | Type | Default | Description |
|:---:|:---:|:---:|:---|
| `ast` | `{Boolean}` | `false` | if `true`  it uses ast ([pug-source-gen](https://github.com/pugjs/pug-source-gen) is used, but sometimes it does not work well because it is not maintained). |
| `adjustIndent` | `{Boolean}` | `false` | if `true` the indent will be adjusted automatically (sometimes it does not work well). |

Here's an example webpack config illustrating how to use these options

***webpack.config.js***
```javascript
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.pug',
      filename: 'index.pug'
    }),
    new HtmlWebpackPugPlugin({
      adjustIndent: true
    })
  ]
}
```

Output Example
--------------

Pug/Jade

```pug
doctype html
html
  head
    meta(charset="utf-8")
    link(href="styles.css" rel="stylesheet")
  body
    script(src="bundle.js")
```

If you are interested, look at examples.

License
-------

This project is licensed under [MIT](https://github.com/negibouze/html-webpack-pug-plugin/blob/master/LICENSE).
