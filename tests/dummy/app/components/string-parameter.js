import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  greeting: "hello",
  layout: hbs('<h1>{{greeting}}</h1>')
});
