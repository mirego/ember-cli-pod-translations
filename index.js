/* eslint-env node */

'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const Plugin = require('broccoli-plugin');
const mergeTrees = require('broccoli-merge-trees');
const mkdirp = require('mkdirp');

const TranslationsCompiler = function(inputNode) {
  Plugin.call(this, [inputNode], {
    name: 'ember-cli-pod-translations'
  });
};

TranslationsCompiler.prototype = Object.create(Plugin.prototype);
TranslationsCompiler.prototype.constructor = TranslationsCompiler;

TranslationsCompiler.prototype.build = function() {
  const translationsFiles = glob.sync(`${this.inputPaths[0]}/**/translations.*.json`);

  const localeRegexp = /translations\.([a-z]+)\.json/g;

  // This object is structured as to be able to push
  // all translations in the same file easily
  // {
  //   <path to pod>: {
  //     <locale>: [<translations>]
  //   }
  // }
  const processedPods = translationsFiles.reduce((pods, file) => {
    localeRegexp.lastIndex = 0;
    const [_match, locale] = localeRegexp.exec(file);
    const podPath = path.dirname(file).replace(this.inputPaths[0], '');
    const translations = JSON.parse(fs.readFileSync(file));

    if (pods.has(podPath)) {
      pods.get(podPath)[locale] = translations;
    } else {
      pods.set(podPath, {
        [locale]: translations
      });
    }

    return pods;
  }, new global.Map());

  processedPods.forEach((translations, podPath) => {
    mkdirp.sync(path.join(this.outputPath, podPath));
    fs.writeFileSync(path.join(this.outputPath, podPath, 'translations.js'), `export default ${JSON.stringify(translations)};`);
  });
};

module.exports = {
  name: 'ember-cli-pod-translations',

  isDevelopingAddon() {
    return false;
  },

  included(app) {
    this.projectRoot = this._projectRoot(app.trees);
  },

  treeForApp(tree) {
    return mergeTrees([tree, new TranslationsCompiler(this.projectRoot)]);
  },

  _isAddon() {
    return Boolean(this.parent.parent);
  },

  _projectRoot(trees) {
    let projectRoot;

    if (this._isAddon()) {
      projectRoot = `${this.parent.root}/addon`;
    } else if (trees && trees.app) {
      projectRoot = trees.app;
    } else {
      projectRoot = `${this.parent.root}/app`;
    }

    return projectRoot;
  }
};
