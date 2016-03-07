'use strict';
import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'profile/:id': 'profile'
  },

  initialize() {
    //NOTE: temporary emulate loading
    //TODO: fetch data here, on success
    setTimeout(function() {
      $('body').removeClass('loading');
      $('.hidden:not(.badge)').removeClass('hidden');
    }, 1000);
  },

  dashboard() {

  },

  profile(id) {

  },

  loadView(view) {
    this.view && this.view[this.view.close ? 'close' : 'remove']();
    this.view = view;
  }
});
