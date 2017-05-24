import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-foo', 'Integration | Component | x-foo', {
  integration: true
});

test('it renders a translated string', function(assert) {
  this.render(hbs`{{x-foo}}`);

  assert.equal(this.$().text().trim(), 'Hello World');
});
