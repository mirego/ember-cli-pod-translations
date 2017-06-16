# ember-cli-pod-translations

[![Build Status](https://travis-ci.org/mirego/ember-cli-pod-translations.svg?branch=master)](https://travis-ci.org/mirego/ember-cli-pod-translations)

An addon to compile your locale files inside pods.

## Installation

```shell
$ ember install ember-cli-pod-translations
```

## Usage

1. __Create translation files for your components, controllers or routes__

	For example, we could create an english file `app/pods/components/x-foo/translations.en.json`

	```json
	{
	  "hello_world": "Hello World"
	}
	```

	Then a french file `app/pods/components/x-foo/translations.fr.json`:

	```json
	{
	  "hello_world": "Bonjour le monde"
	}
	```

2. __Extend your component, controller or route with the `Localizable` mixin__

	*NOTE: This is required for both the JS and template usage*

	```js
	// app/pods/components/x-foo/component.js

	import Ember from 'ember';
	import Localizable from 'ember-cli-pod-translations/mixins/localizable';
	import translations from './translations';

	export default Ember.Component.extend(Localizable(translations));
	```

3. __Use your translations in your Ember object__

	```js
	// app/pods/components/x-foo/component.js

	import Ember from 'ember';
	import Localizable from 'ember-cli-pod-translations/mixins/localizable';
	import translations from './translations';

	export default Ember.Component.extend(Localizable(translations), {
	  helloString: computed(function() {
	    return this.localTranslation('hello_world');
	  })
	});
	```

4. __Use your translations in your template__

	```hbs
	{{!-- app/pods/components/x-foo/template.hbs --}}

	{{local-t localizablePrefix 'hello_world'}}

	You can also use a "raw" translation which is not wrapped in a SafeString for ember-moment for example:

	{{moment-format date (local-t-raw localizablePrefix 'date_format')}}
	```

## Contributing

```shell
$ git clone https://github.com/mirego/ember-cli-pod-translations
$ cd ember-cli-pod-translations
$ yarn install
```

## Running the dummy app

```shell
$ ember serve
```

Visit your app at [http://localhost:4200](http://localhost:4200).

## Running tests

```shell
$ npm test # Runs `ember try:each` to test the addon against multiple Ember versions
$ ember test
$ ember test --server
```

## Building

```shell
$ ember build
```

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
