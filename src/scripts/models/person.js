'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';

class Person extends Backbone.Model {
  constructor(options) {
    super(options);

    this.urlRoot = `${API_ROOT}/persons/`;
  }
}


export default Person;
