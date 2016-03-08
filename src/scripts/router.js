'use strict';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import { getActivityCount, getDealsByPerson, getActivity } from './utils/api';
import Persons from './collections/persons';
import { PIPEDRIVE_API_TOKEN } from '../../settings';
import Person from './models/person';
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

    this._renderPersonsList(id)
    $container.empty();
    $app.addClass('loading');

    person.fetch({cache: true})
      // TODO: dry and refactor to models where it is needed
      .then(() => {
        const activityId = person.attributes.next_activity_id;
        if (!!activityId) return getActivity(activityId)
        return false
      })
      .then((activity) => {
        if (!activity) return

        const { type, update_time } = activity.data;
        person.set('nextActivity', `${_.capitalize(type)}, ${moment(update_time).fromNow()}`);
      })
      .then(() => {
        const activityId = person.attributes.last_activity_id;
        if (!!activityId) return getActivity(activityId)
        return false
      })
      .then((activity) => {
        if (!activity) return

        const { type, update_time } = activity.data;
        person.set('lastActivity', `${_.capitalize(type)}, ${moment(update_time).fromNow()}`);
      })
      .then(() => {
        return getDealsByPerson(person.get("id"));
      })
      .then((response) => {
        person.set("deals", _.isNull(response.data) ? [] : response.data);
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
