import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  layout: hbs('<p id="comment"><!-- this comment will not show up --></p>')
});
