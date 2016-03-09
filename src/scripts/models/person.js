'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import moment from 'moment';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';
import { getDealsByPerson } from '../utils/api';
import { props } from '../utils/decorators';

@props({
  defaults: {
    phone: 'n/a',
    email: 'n/a',
    added: 'n/a',
    nextActivity: 'n/a',
    lastActivity: 'n/a',
    dealsCount: 0,
    org_name: null,
    smallestDeal: {
      name: 'n/a',
      value: 'n/a'
    },
    largestDeal: {
      name: 'n/a',
      value: 'n/a'
    },
    deals: []
  }
})
class Person extends Backbone.Model {
  constructor(options) {
    super(options);

    this.urlRoot = `${API_ROOT}/persons/`;
  }

  parse(response) {
    return response.data;
  }

  toJSON() {
    // TODO: refactor to presenter object
    const attrs = this.attributes;

    const deals = attrs.deals;
    const dealsCount = deals.length;
    const phone = attrs.phone[0].value;
    const email = attrs.email[0].value;
    const added = moment(attrs.add_time).format("MMMM Do, YYYY");

    const { name, org_name, nextActivity, lastActivity } = attrs;
    let { largestDeal, smallestDeal } = attrs;

    // TODO: refactor!
    if (dealsCount > 0) {
      let largeDeal = _.maxBy(deals, 'value');
      let smallDeal = dealsCount == 1 ? largeDeal : _.minBy(deals, 'value');

      largestDeal = {
        name: largeDeal.title,
        value: largeDeal.formatted_value
      };

      smallestDeal = {
        name: smallDeal.title,
        value: largeDeal.formatted_value
      };
    }

    return {
      name,
      phone,
      email,
      added,
      org_name,
      dealsCount,
      nextActivity,
      lastActivity,
      smallestDeal,
      largestDeal,
    }
  }

  url() {
    return `${this.urlRoot}${this.id}?api_token=${PIPEDRIVE_API_TOKEN}`;
  }

}


export default Person;
