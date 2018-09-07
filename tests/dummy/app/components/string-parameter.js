import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  greeting: "hello",
  layout: hbs('<h1>{{greeting}}</h1>')
});
