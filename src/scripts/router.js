'use strict';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import { getActivityCount, getActivity } from './utils/api';
import Persons from './collections/persons';
import Deals from './collections/deals';
import { PIPEDRIVE_API_TOKEN } from '../../settings';
import Person from './models/person';
import Activity from './models/activity';
import PersonsView from './views/persons-view';
import PersonDetailsView from './views/person-details-view';
import moment from 'moment';

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'persons/:id': 'person'
  },

  initialize() {
    this.collection = new Persons();
    this.collection.fetch({reset: true, cache: true});

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
    const $app = $('body');
    const $container = $('#person_details_container');
    const person = new Person({id: id});
    var deals = new Deals({personId: id});

    this._renderPersonsList(id)
    $container.empty();
    $app.addClass('loading');

    person.fetch({cache: true})
      .then(() => {
        let activities = [];
        const nextActivityId = person.attributes.next_activity_id;
        const lastActitityId = person.attributes.last_activity_id;

        !!nextActivityId && activities.push(new Activity({id: nextActivityId}).fetch({cache: true}));
        !!lastActitityId && activities.push(new Activity({id: lastActitityId}).fetch({cache: true}));

        if (_.isEmpty(activities)) return

        return $.when(...activities);
      })
      .then((next, last) => {
        !!next && !!next.toJSON && person.set('nextActivity', next.toJSON().value);
        !!last && !!last.toJSON && person.set('lastActivity', last.toJSON().value);
      })
      .then(() => {
        return deals.fetch({cache: true});
      })
      .then((deals) => {
        person.set("deals", deals.toJSON());
      })
      .then(() => {
        $app.removeClass('loading');
        $container.empty();
        $container.html(new PersonDetailsView({model: person}).render().$el)
      })
      .fail((error) => {
        console.error('[APPLICATION ERROR]: can\'t fetch user details');
      })
  },

  _renderPersonsList(activeId) {
    this.personsRegion = new PersonsView({collection: this.collection, active: activeId});
    this.personsRegion.render()
  }

});
