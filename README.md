# LanguageServer-Ember package

[![Build Status](https://img.shields.io/travis/josa42/atom-languageserver-ember.svg?style=flat-square)](https://travis-ci.org/josa42/atom-languageserver-ember)
[![Plugin installs!](https://img.shields.io/apm/dm/languageserver-ember.svg?style=flat-square)](https://atom.io/packages/languageserver-ember)
[![Package version!](https://img.shields.io/apm/v/languageserver-ember.svg?style=flat-square)](https://atom.io/packages/languageserver-ember)
[![Dependencies!](https://img.shields.io/david/josa42/atom-languageserver-ember.svg?style=flat-square)](https://david-dm.org/josa42/atom-languageserver-ember)

This is the [Atom package](https://atom.io/packages/languageserver-ember) to use the [Ember Language Server](https://github.com/emberwatch/ember-language-server).

**🚧 Work in Progress**

## Installtion

```
$ apm install languageserver-ember
```

## Features

- **Template Condecompletion**
  - Components
  - Helpers


![](https://raw.githubusercontent.com/josa42/atom-languageserver-ember/master/.github/images/template-completion-v3.gif)

- **Template Linting**
  - [ember-template-lint](https://github.com/rwjblue/ember-template-lint) (if
    a `.template-lintrc.js` is in the project)
  
![](https://raw.githubusercontent.com/josa42/atom-languageserver-ember/master/.github/images/template-linting.gif)
  
**Definition providers (Go To Definition, Peek Definition)**
  - Work in progress

See [emberwatch/ember-language-server](https://github.com/emberwatch/ember-language-server)
for more information.

## Depdenencies

- [atom/atom-languageclient](https://github.com/atom/atom-languageclient)
- [emberwatch/ember-language-server](https://github.com/emberwatch/ember-language-server)

## License

MIT License.  See [the license](LICENSE.md) for more details.
