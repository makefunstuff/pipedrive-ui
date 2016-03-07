import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'lodash';
import { props } from '../utils/decorators';


@props({
  tagName: 'div',
  className: 'details'
})
class PersonDetailsView extends Backbone.View {
  constructor(options) {
    super(options)

    this.template = _.template($('#person_details_template').html())
  }

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}


export default PersonDetailsView;
