Pug/Slim/Haml extension for the HTML Webpack Plugin
========================================

Installation
------------
Install the plugin with npm:

```shell
$ npm install html-webpack-pug-plugin --save-dev
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
plugins: [
  new HtmlWebpackPlugin({
		filetype: 'pug'
	}),
  new HtmlWebpackPugPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackPugPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		template: 'src/views/_test.pug',
		filename: 'test.pug',
		filetype: 'pug'
	}),
  new HtmlWebpackPlugin({
		template: 'src/views/_test.slim',
		filename: 'test.slim',
		filetype: 'slim'
	}),
  new HtmlWebpackPlugin({
		template: 'src/views/_test.haml',
		filename: 'test.haml',
		filetype: 'haml'
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

Slim

```slim
doctype html
html
  head
    meta charset="utf-8"
    link href="bundle.css" rel="stylesheet"
  body
    script type="text/javascript" src="bundle.js"
```

Haml

```haml
!!! 5
%html
  %head
    %meta{ :charset => "utf-8" }
    %link{ :href => "bundle.css", :rel => "stylesheet"}
  %body
    %script{ :src => "bundle.js" }
```

License
-------

This project is licensed under [MIT](https://github.com/negibouze/html-webpack-pug-plugin/blob/master/LICENSE).
