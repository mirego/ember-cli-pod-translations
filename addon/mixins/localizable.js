import Ember from 'ember';

const {inject} = Ember;

export default function(translations) {
  return Ember.Mixin.create({
    i18n: inject.service('i18n'),

    init() {
      this._super(...arguments);

      const localizablePrefix = this._debugContainerKey
        .split(':')
        .filter((segment) => !!segment)
        .pop();

      Object.keys(translations).forEach((locale) => {
        this.get('i18n').addTranslations(locale, {[localizablePrefix]: translations[locale]});
      });

      this.set('localizablePrefix', localizablePrefix);
    },

    localTranslation(key, variables) {
      return this.get('i18n').t(`${this.get('localizablePrefix')}.${key}`, variables);
    },

    localRawTranslation(key) {
      return this.get('i18n').t(`${this.get('localizablePrefix')}.${key}`).toString();
    }
  });
}
