import Ember from 'ember';

const {inject} = Ember;

export default Ember.Helper.extend({
  i18n: inject.service('i18n'),

  compute([prefix, key], hash) {
    return this.get('i18n').t(`${prefix}.${key}`, hash).string;
  }
});
