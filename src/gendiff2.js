import _ from 'lodash';
import stylish from './stylish.js';
import parser from './parser.js';

const gendiff = (filepath1, filepath2, formatName = stylish) => {
  const parsedValueOfTheFirstFile = parser(filepath1);
  const parsedValueOfTheSecondFile = parser(filepath2);

  const diff = (nodeOfFirstFile, nodeOfSecondFile) => {
    if (!_.isObject(nodeOfFirstFile) || !_.isObject(nodeOfSecondFile)) {
      if (nodeOfFirstFile === nodeOfSecondFile) return true;
      return false;
    }

    const keysOfNodeOfFirstFile = Object.keys(nodeOfFirstFile);
    const keysOfNodeOfSecondFile = Object.keys(nodeOfSecondFile);
    const allKeys = _.uniq([...keysOfNodeOfFirstFile, ...keysOfNodeOfSecondFile]).sort();

    const treeOfDiff = allKeys.reduce((acc, key) => {
      if (_.has(nodeOfFirstFile, key) && _.has(nodeOfSecondFile, key)) {
        if (_.isObjectLike(nodeOfFirstFile[key]) && _.isObjectLike(nodeOfSecondFile[key])) {
          acc[`${key}`] = diff(nodeOfFirstFile[key], nodeOfSecondFile[key]);
          return acc;
        }

        const areUnchanged = diff(nodeOfFirstFile[key], nodeOfSecondFile[key]);
        if (areUnchanged) {
          acc[`${key}`] = nodeOfFirstFile[key];
          return acc;
        }
      }

      if (_.has(nodeOfFirstFile, key)) acc[`- ${key}`] = nodeOfFirstFile[key];
      if (_.has(nodeOfSecondFile, key)) acc[`+ ${key}`] = nodeOfSecondFile[key];
      return acc;
    }, {});

    return treeOfDiff;
  };

  return formatName(diff(parsedValueOfTheFirstFile, parsedValueOfTheSecondFile));
};

const getStatus = (key) => {
  if (key.startsWith('+')) return 'added';
  if (key.startsWith('-')) return 'deleted';
  return 'unchanged';
};

const getAsArrayOfKeys = (tree) => Object.keys(tree);

const getAsArrayKeysAndValues = (tree) => Object.entries(tree);

const getValue = (value) => {
  if (!_.isObject(value)) return value;

  const obj = getAsArrayKeysAndValues(value).reduce((acc, [key, value2]) => {
    acc[key] = getValue(value2);
    return acc;
  }, {});

  return obj;
};

export {
  gendiff, getStatus,
  getAsArrayKeysAndValues,
  getValue, getAsArrayOfKeys,
};
