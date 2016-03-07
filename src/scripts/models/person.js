'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';

class Person extends Backbone.Model {
  constructor(options) {
    super(options);

    this.urlRoot = `${API_ROOT}/persons/`;
  }

  parse(response) {
    return response.data;
  }

  url() {
    return `${this.urlRoot}${this.id}?api_token=${PIPEDRIVE_API_TOKEN}`;
  }

}


export default Person;
