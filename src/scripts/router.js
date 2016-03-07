'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import { getActivityCount } from './utils/api';
import Persons from './collections/persons';
import { PIPEDRIVE_API_TOKEN } from '../../settings';
import Person from './models/person';
import PersonsView from './views/persons-view';
import PersonDetailsView from './views/person-details-view';

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'persons/:id': 'person'
  },

  initialize() {
    this.collection = new Persons();
    this.collection.fetch({reset: true});

    getActivityCount()
      .then((data) => {
        var $badge = $('.activities-count');
        $badge.removeClass('hidden')
        .html(data)

        $('body').removeClass('loading');
        $('.hidden:not(.badge)').removeClass('hidden');
      })

  },

  dashboard() {
    this._renderPersonsList()
  },

  person(id) {
    const $container = $('#person_details_container');
    const person = new Person({id: id});

    this._renderPersonsList(id)

    person.fetch()

    $container.empty();
    $container.html(new PersonDetailsView({model: person}).render().$el)
  },

  _renderPersonsList(activeId) {
    this.personsRegion = new PersonsView({collection: this.collection, active: activeId});
    this.personsRegion.render()
  }

});
