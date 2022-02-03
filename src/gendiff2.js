import _ from 'lodash';
import getValue1 from './parser.js';
// import strinify from './stylish.js';

const setProperty = (status, value) => {
  const propertyObj = { status, value };
  return propertyObj;
};

const getStatus = (obj, status = 'status') => obj[status];

const getValue = (obj, position = 0, value = 'value') => {
  if (position < 1) {
    // console.log(obj[value]);
    return obj[value][0];
  }
  return obj[value][1];
};
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const stringify = (value, replacer = ' ', countReplace = 2) => {
  const goToDepth = (meaning, depth = 1) => {
    if (!_.isObject(meaning)) return `${meaning}`;

    const currentReplacerLength = countReplace * depth;
    const getStrings = Object.entries(value).map(([key, property]) => `\n${replacer.repeat(currentReplacerLength)}${key}: ${goToDepth(property, depth + 1)}`);

    const getresult = getStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc + str}\n${replacer.repeat(currentReplacerLength - countReplace)}}`;
      return acc + str;
    }, '{');

    return getresult;
  };
  return goToDepth(value);
};
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
const gendiff = (node1, node2, stylish = stringify) => {
  if (!_.isObject(node1) || !_.isObject(node2)) {
    if (node1 === node2) return false;
    return false;
  }

  const [keysOfObj1, keysOfObj2] = [Object.keys(node1), Object.keys(node2)];
  const allKeys = _.uniq([...keysOfObj1, ...keysOfObj2]).sort();

  const resultTree = allKeys.reduce((acc, key) => {
    if (_.has(node1, key) && _.has(node2, key)) {
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        acc[`  ${key}`] = gendiff(node1[key], node2[key]);
        return acc;
      }
      const isChanged = gendiff(node1[key], node2[key]);
      if (!isChanged) {
        acc[`  ${key}`] = node1[key];
        return acc;
      }
      if (isChanged) {
        acc[`- ${key}`] = node1[key];
        acc[`+ ${key}`] = node2[key];
        return acc;
      }
    } else {
      if (_.has(node1, key)) acc[`- ${key}`] = node1[key];
      if (_.has(node2, key)) acc[`+ ${key}`] = node2[key];
      // console.log(acc);
      return acc;
    }
  }, {});
  // console.log(resultTree, '\n ------------------');
  return resultTree;
};
/*
const n1 = getValue1('file1.json');
const n2 = getValue1('file2.json');
// startpoint!!!!!!!!!
console.log((gendiff(n1, n2)));
*/
export {
  gendiff, getStatus,
  getValue,
};
