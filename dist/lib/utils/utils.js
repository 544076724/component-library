import { camelize, capitalize, extend, hasOwn, isArray, isObject, isString, looseEqual } from '@vue/shared'; // coerce truthy value to array

export var coerceTruthyValueToArray = function coerceTruthyValueToArray(arr) {
  if (!arr && arr !== 0) {
    return [];
  }

  return Array.isArray(arr) ? arr : [arr];
};
export function entries(obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]];
  });
} // reexport from lodash & vue shared

export { hasOwn // isEmpty,
// isEqual,
, isObject, isArray, isString, capitalize, camelize, looseEqual, extend };