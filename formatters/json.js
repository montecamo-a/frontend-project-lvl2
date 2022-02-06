import _ from 'lodash';
import {
  getDiffAsObj, getArrayOfKeysStatusesValuesOfFirstLevelNesting,
} from '../src/diff.js';
import stylish from './stylish.js';

const json = (diff, format = stylish) => {
  const diffAsObj = getDiffAsObj(diff);

  const formatter = (value) => {
    if (!_.isObject(value)) return `"${value}"`;
    const jsonObj = getArrayOfKeysStatusesValuesOfFirstLevelNesting(value)
      .reduce((acc, [key, status, meaning]) => {
        let newKey;
        if (status === 'updated/added') newKey = `"${_.trimStart(key, '|updated/added|')}"`;
        if (status === 'updated/deleted') newKey = `"${_.trimStart(key, '|updated/deleted|')}"`;
        if (status === 'added') newKey = `"${_.trimStart(key, '|added|')}"`;
        if (status === 'removed') newKey = `"${_.trimStart(key, '|removed|')}"`;
        if (status === 'unchanged') newKey = `"${key}"`;
        acc[newKey] = { value: formatter(meaning), status };
        return acc;
      }, {});
    return jsonObj;
  };
  return format(formatter(diffAsObj));
};
export default json;
