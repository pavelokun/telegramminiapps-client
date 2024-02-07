import { isEmpty, isNil, isUndefined } from 'lodash';

export function isNothing(something: any) {
  if (typeof something === 'number') {
    return something === 0;
  }
  return isEmpty(something) || isUndefined(something) || isNil(something);
}
