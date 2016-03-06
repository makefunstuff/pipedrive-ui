import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'profile/:id': 'profile'
  },

  initialize() {
    $('body').append('<div id="app"></div>');
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
