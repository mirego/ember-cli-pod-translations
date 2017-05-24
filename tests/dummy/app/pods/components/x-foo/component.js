import Ember from 'ember';
import Localizable from 'ember-cli-pod-translations/mixins/localizable';
import translations from './translations';

export default Ember.Component.extend(Localizable(translations));
