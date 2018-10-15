import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  greeting: "hello from view",
  layout: hbs`
    greeting: <span>{{greeting}}</span>
  `
});
