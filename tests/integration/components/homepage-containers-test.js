import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('homepage-containers', 'Integration | Component | homepage containers', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{homepage-containers}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#homepage-containers}}
      template block text
    {{/homepage-containers}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
