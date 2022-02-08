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

const getChildOfChildrens = (array, statusOfUpdatedKey = null) => {
  let value = 'uncorrectStatus';
  //console.log(array[0]);
  if (statusOfUpdatedKey === null) [value] = array;
  if (statusOfUpdatedKey === 'added') [, value] = array;
  if (statusOfUpdatedKey === 'removed') [value] = array;
  return value;
};
/*
const getArrayOfKeysStatusesValuesOfFirstLevelNesting = (diffAsObj) => {
  const result = Object.entries(diffAsObj).map(([key, value]) => {
    const status = getStatusOfKey(key);
    let newKey = key;
    if (status !== 'unchanged') newKey = _.trimStart(key, `|${status}|`);
    return [newKey, status, value];
  });
  return result;
};

const getArrayOfObjWithPathStatusValueOfAllChangedKeys =
 (node, status = 'unchanged', path = '') => {
  if (status === 'added' || status === 'removed')
  return { path, status, getChildOfChildrens(node) };
  if (status === 'updated') return { path, status, meaning };
  const arrayWithPathsStatusesValues = getChildrensOfNodeAsArrayOfobj(node)
    .flatMap(({ name, status, childrens }) => {
      const newPath = `${path}${name}.`;
      if (!_.isObject(value) && status2 === 'unchanged') return [];
      return getArrayOfObjWithPathStatusValueOfAllChangedKeys(value, status2, newPath);
    });
  return arrayWithPathsStatusesValues;
};
*/
export {
  diff, getStatusOfNode,
  getKeyOfNode, getChildrensOfNodeAsArray,
  getChildOfChildrens,
};
