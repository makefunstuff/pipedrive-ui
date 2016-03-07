import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'lodash';
import { props } from '../utils/decorators';
import PersonView from './person-view';


@props({
  el: '#persons_container',
})
class PersonsView extends Backbone.View {
  constructor(options) {
    super(options);
    this.active = options.active;
  }

  initialize() {
    this.collection.on("reset", this.render, this);
  }

  render() {
    this.$el.empty();
    this.collection.each(this.renderItem, this);
    return this;
  }

  renderItem(model) {
    const view = new PersonView({model: model}).render()
    if (+this.active == model.get('id')) {
      $('#persons_container .user-link').removeClass('active')
      view.$el.addClass('active')
    }
    this.$el.append(view.$el);
  }
}

export default PersonsView;
