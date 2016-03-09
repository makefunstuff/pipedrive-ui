'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import moment from 'moment';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';
import { getDealsByPerson } from '../utils/api';
import { props } from '../utils/decorators';

@props({
  id: null,
  type: null,
  defaults: {
    value: ''
  }
})
class Activity extends Backbone.Model {
  constructor(options) {
    super(options);
  }

  parse(response) {
    return response.data;
  }

  url() {
    return `${API_ROOT}/activities/${this.id}?api_token=${PIPEDRIVE_API_TOKEN}`;
  }

  toJSON() {
    const { type, update_time } = this.attributes;
    return { value: `${_.capitalize(type)}, ${moment(update_time).fromNow()}`}
  }
}


export default Activity;
