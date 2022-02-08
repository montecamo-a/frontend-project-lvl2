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
    const allKeys = _.uniq([...keysOfNodeOfFirstFile, ...keysOfNodeOfSecondFile]).sort();

    const partOfTree = allKeys.reduce((acc, key) => {
      if (_.has(nodeOfFirstFile, key) && _.has(nodeOfSecondFile, key)) {
        if (_.isObjectLike(nodeOfFirstFile[key]) && _.isObjectLike(nodeOfSecondFile[key])) {
          acc.push({ name: `${key}`, status: 'unchanged', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfSecondFile[key]) });
          return acc;
        }

        const isUnchanged = checkIsUnchanged(nodeOfFirstFile[key], nodeOfSecondFile[key]);
        if (!isUnchanged) {
          acc.push({ name: `${key}`, status: 'unchanged', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]) });
          return acc;
        }
        if (isUnchanged) {
          acc.push({ name: `${key}`, status: 'updated', childrens: [getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]), getArrayOfDiff(nodeOfSecondFile[key], nodeOfSecondFile[key])].flat() });
          return acc;
        }
      }

      if (_.has(nodeOfFirstFile, key)) acc.push({ name: `${key}`, status: 'removed', childrens: getArrayOfDiff(nodeOfFirstFile[key], nodeOfFirstFile[key]) });
      if (_.has(nodeOfSecondFile, key)) acc.push({ name: `${key}`, status: 'added', childrens: getArrayOfDiff(nodeOfSecondFile[key], nodeOfSecondFile[key]) });
      return acc;
    }, []);
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

const getAddedChildAsArrayOfUpdatedNode = (array) => [array[1]];

export {
  diff, getStatusOfNode,
  getKeyOfNode, getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildAsArrayOfUpdatedNode,
  getAddedChildAsArrayOfUpdatedNode,
};
