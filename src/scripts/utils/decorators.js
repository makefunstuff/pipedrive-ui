import { isFunction } from 'lodash';

export function props(value) {
  return function decorator(target) {
    _.extend(target.prototype, value);
  }
}