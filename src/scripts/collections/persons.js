'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';
import Person from '../models/person';

class Persons extends Backbone.Collection {
  constructor(options) {
    super(options);
    this.model = Person;
  }

  parse(response) {
    return response.data;
  }

  url() {
    return `${API_ROOT}/persons/?api_token=${PIPEDRIVE_API_TOKEN}`
  }
}


export default Persons;
