/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const diff = (valueOfFirstFile, valueOfSecondFile) => {
  const getArrayOfDiff = (nodeOfFirstFile, nodeOfSecondFile) => {
    const checkIsUnchanged = (firstValue, secondValue) => {
      if (firstValue === secondValue) return false;
      return true;
    };

    if (!_.isObject(nodeOfFirstFile) || !_.isObject(nodeOfSecondFile)) {
      return [nodeOfFirstFile];
    }

    const keysOfNodeOfFirstFile = Object.keys(nodeOfFirstFile);
    const keysOfNodeOfSecondFile = Object.keys(nodeOfSecondFile);
    const allKeys = _.uniq([...keysOfNodeOfFirstFile, ...keysOfNodeOfSecondFile]).slice().sort();

    const partOfTree = allKeys.map((key) => {
      if (_.has(nodeOfFirstFile, key) && _.has(nodeOfSecondFile, key)) {
        if (_.isObjectLike(nodeOfFirstFile[key]) && _.isObjectLike(nodeOfSecondFile[key])) {
          return { name: `${key}`, status: 'unchanged', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfSecondFile[key]) };
        }

        const isUnchanged = checkIsUnchanged(nodeOfFirstFile[key], nodeOfSecondFile[key]);
        if (!isUnchanged) {
          return { name: `${key}`, status: 'unchanged', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]) };
        }
        if (isUnchanged) {
          return { name: `${key}`, status: 'updated', childrens: [getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]), getArrayOfDiff(nodeOfSecondFile[key], nodeOfSecondFile[key])].flat() };
        }
      }

      if (_.has(nodeOfFirstFile, key)) return { name: `${key}`, status: 'removed', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]) };
      if (_.has(nodeOfSecondFile, key)) return { name: `${key}`, status: 'added', childrens: getArrayOfDiff(nodeOfSecondFile[key], nodeOfSecondFile[key]) };
    });
    return partOfTree;
  };
  const treeOfDiff = { name: 'this is diff', childrens: getArrayOfDiff(valueOfFirstFile, valueOfSecondFile) };
  return treeOfDiff;
};

const getStatusOfNode = (node) => node.status;

const getKeyOfNode = (node) => node.key;

const getChildrensOfNodeAsArray = (node) => node.childrens;

const getFirstChildOfChildrens = (array) => array[0];

const getRemovedChildAsArrayOfUpdatedNode = (array) => [array[0]];

const getRemovedChildOfUpdatedNode = (array) => array[0];

const getAddedChildOfUpdatedNode = (array) => array[1];

const getAddedChildAsArrayOfUpdatedNode = (array) => [array[1]];

export {
  diff, getStatusOfNode,
  getKeyOfNode, getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildAsArrayOfUpdatedNode,
  getAddedChildAsArrayOfUpdatedNode, getRemovedChildOfUpdatedNode,
  getAddedChildOfUpdatedNode,
};
