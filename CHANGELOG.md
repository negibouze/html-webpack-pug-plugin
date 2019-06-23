Change History
==============

v2.0.0 (June 24, 2019)
---

### Breaking Changes

* Adjustment of indent is now off by default.

### Enhancements

* Add options (details are described in [Readme](https://github.com/negibouze/html-webpack-pug-plugin/blob/master/README.md)).

### Bug Fixes

* style is not indented properly if applying style on the body [#22](https://github.com/negibouze/html-webpack-pug-plugin/issues/22)
* Broken indentation with each expression [#23](https://github.com/negibouze/html-webpack-pug-plugin/issues/23)

v1.0.1 (May 14, 2019)
---

### Breaking Changes

* None.

### Enhancements

* None.

### Bug Fixes

* Line after head is not indented [#20](https://github.com/negibouze/html-webpack-pug-plugin/issues/20)

v1.0.0 (May 09, 2019)
---

### Breaking Changes

* The option "filetype" is no longer available (with HTML Webpack Plugin v4).

### Enhancements

* Supported HTML Webpack Plugin v4.

### Bug Fixes

* Support for html-webpack-plugin @next (v4) [#19](https://github.com/negibouze/html-webpack-pug-plugin/issues/19)

v0.3.0 (Feb 02, 2018)
---

### Breaking Changes

* None.

### Enhancements

* Supported Webpack v4.

### Bug Fixes

* Support for Webpack 4? [#15](https://github.com/negibouze/html-webpack-pug-plugin/issues/15)

v0.2.2 (Jan 30, 2018)
---

### Breaking Changes

* None.

### Enhancements

* None.

### Bug Fixes

* Indentation of link and script is not working properly [#14](https://github.com/negibouze/html-webpack-pug-plugin/issues/14)

v0.2.1 (Aug 9, 2017)
---

### Breaking Changes

* None.

### Enhancements

* None.

### Bug Fixes

* no injection when template uses tabs instead of spaces [#10](https://github.com/negibouze/html-webpack-pug-plugin/issues/10)

v0.2.0 (May 25, 2017)
---

### Breaking Changes

* None.

### Enhancements

* Supports inject 'head' (HTML Webpack Plugin Configuration).

### Bug Fixes

* adjustHeadElementsIndentation() shouldn't flatten the indentation of nested elements [#9](https://github.com/negibouze/html-webpack-pug-plugin/issues/9)

v0.1.0 (May 23, 2017)
---

### Breaking Changes

* No longer support "Slim" and "Haml"（prepared other packages [Slim](https://github.com/negibouze/html-webpack-slim-plugin), [Haml](https://github.com/negibouze/html-webpack-haml-plugin)）.

### Enhancements

* Supports manifest attribute.

### Bug Fixes

* Error inject when not have head tag [#3](https://github.com/negibouze/html-webpack-pug-plugin/issues/3)  
* Breaks if there's word "body" anywhere in the content (not tag) [#7](https://github.com/negibouze/html-webpack-pug-plugin/issues/7)
