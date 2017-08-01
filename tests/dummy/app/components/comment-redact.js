import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  layout: hbs('<p id="comment"><!-- this comment will not show up --></p>')
});
