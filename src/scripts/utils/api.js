// API calls that are not suitable either for model or for collection
import $ from 'jquery';
import _ from 'lodash';
import { PIPEDRIVE_API_TOKEN, API_ROOT } from '../../../settings';

export function getActivityCount() {
  const activitiesEndpoint = `${API_ROOT}/activities?start=0&done=0&api_token=${PIPEDRIVE_API_TOKEN}`

  return $.getJSON(activitiesEndpoint)
    .then((data) => {
      return data.data.length
    })
    .fail((error) => {
      console.error('[APPLICATION ERROR]: can\'t fetch activities');
    })
}

export function getActivity(id) {
  const activityEndpoint = `${API_ROOT}/activities/${id}?api_token=${PIPEDRIVE_API_TOKEN}`;
  return $.getJSON(activityEndpoint);
}
