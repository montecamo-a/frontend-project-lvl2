import _ from 'lodash';
import {
  getDiffAsObj, getArrayOfObjWithPathStatusValueOfAllChangedKeys,
} from '../src/diff.js';

const plain = (diff) => {
  const diffAsObj = getDiffAsObj(diff);
  const arrayWithPathsStatusesValues = getArrayOfObjWithPathStatusValueOfAllChangedKeys(diffAsObj);
  const FirstFormater = arrayWithPathsStatusesValues.reduce((acc, { meaning, path, status }) => {
    let value = meaning;
    const newPath = _.trimEnd(path, '.');
    if (_.isObject(meaning)) value = '[complex value]';
    if (typeof (meaning) === 'string') value = `'${meaning}'`;
    acc.push([value, newPath, status]);
    return acc;
  }, []);

  let container;
  const secondFormater = FirstFormater.map(([value, path, status]) => {
    let str;
    if (status === 'added') str = `Property '${path}' was added with value: ${value}\n`;
    if (status === 'removed') str = `Property '${path}' was removed\n`;
    if (status === 'updated/removed') container = `${value}`;
    if (status === 'updated/added') str = `Property '${path}' was updated. From ${container} to ${value}\n`;
    return str;
  });
  const result = secondFormater.join('');
  return result;
};
export default plain;
