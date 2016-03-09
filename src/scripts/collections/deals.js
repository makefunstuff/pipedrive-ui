'use strict';

import Backbone from 'backbone';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';

class Deals extends Backbone.Collection {
  constructor(options) {
    super(options);

    this.personId = options.personId;
  }

  parse(response) {
    return response.data;
  }

  url() {
    return `${API_ROOT}/persons/${this.personId}/deals?start=0status=&api_token=${PIPEDRIVE_API_TOKEN}`;
  }
}


export default Deals;
