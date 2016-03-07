'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import { getActivityCount } from './utils/api';
import Persons from './collections/persons';
import { PIPEDRIVE_API_TOKEN } from '../../settings';
import Person from './models/person';

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'profile/:id': 'profile'
  },

  initialize() {
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
    this.persons = new Persons();
    this.person = new Person({id: 1});
    this.persons.fetch({data: $.param({api_token: PIPEDRIVE_API_TOKEN})})
    this.person.fetch({data: $.param({api_token: PIPEDRIVE_API_TOKEN})})
  },

  profile(id) {

  },

  loadView(view) {
    this.view && this.view[this.view.close ? 'close' : 'remove']();
    this.view = view;
  }
});
