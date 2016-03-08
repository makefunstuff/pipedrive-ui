'use strict';
import $ from 'jquery';
import Backbone from 'backbone';
import Router from './router';

require('backbone-fetch-cache');

$(() => {
  const router = new Router();
  Backbone.history.start({pushState: true});

  // quick and dirty cache invalidation
  window.onbeforeunload = () => { window.localStorage.clear() }
})
