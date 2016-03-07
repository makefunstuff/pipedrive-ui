import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'lodash';
import { props } from '../utils/decorators';

@props({
  tagName: 'li',
  className: 'user-link',
  events: {
    'click': 'onClick'
  }
})
class PersonView extends Backbone.View {
  constructor(options) {
    super(options)
    this.template = _.template($('#person_view_template').html())
  }

  render() {
    const compiled = this.template(this.model.toJSON())
    this.$el.html(compiled);
    return this;
  }

  onClick(e) {
    e.preventDefault();
    Backbone.history.navigate(`persons/${this.model.get('id')}`, {trigger: true, replace: true});
  }
}

export default PersonView;
