'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';
import Person from '../models/person';

class Persons extends Backbone.Collection {
  constructor(options) {
    super(options);
    this.url = `${API_ROOT}/persons`;
    this.model = Person;
  }
}


export default Persons;
