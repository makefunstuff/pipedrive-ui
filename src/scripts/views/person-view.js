import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'lodash';
import { props } from '../utils/decorators';

@props({
  tagName: 'li',
  className: 'user-link',
  template: _.template($('#person_view_template').html()),
  events: {
    'click': 'onClick'
  }
}
class PersonView extends Backbone.View {
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  onClick(e) {
    e.preventDefault();
    this.router.navigate(this.model.get('id'), {replace: true});
  }
}

export default PersonView;
