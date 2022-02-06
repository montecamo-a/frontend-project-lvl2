import _ from 'lodash';
import {
  getDiffAsObj, getArrayOfKeysStatusesValuesOfFirstLevelNesting,
} from '../src/diff.js';

const json = (diff) => {
  const diffAsObj = getDiffAsObj(diff);

  const formatter = (value, statusOfKey) => {
    if (!_.isObject(value) || (_.isObject(value) && statusOfKey !== 'unchanged')) {
      if (typeof (value) === 'string') return `${value}`;
      return value;
    }
    const jsonObj = getArrayOfKeysStatusesValuesOfFirstLevelNesting(value)
      .reduce((acc, [key, status, meaning]) => {
        let newKey;
        if (status === 'updated/added') newKey = `${_.trimStart(key, '|updated/added|')}`;
        if (status === 'updated/removed') newKey = `${_.trimStart(key, '|updated/removed|')}`;
        if (status === 'added') newKey = `${_.trimStart(key, '|added|')}`;
        if (status === 'removed') newKey = `${_.trimStart(key, '|removed|')}`;
        if (status === 'unchanged') newKey = key;
        acc[newKey] = { value: formatter(meaning, status), status };
        return acc;
      }, {});
    return jsonObj;
  };
  return formatter(diffAsObj);
};
export default json;
