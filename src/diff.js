import _ from 'lodash';

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
      if (!areUnchanged) {
        acc[`|updated/removed|${key}`] = nodeOfFirstFile[key];
        acc[`|updated/added|${key}`] = nodeOfSecondFile[key];
        return acc;
      }
    }

    if (_.has(nodeOfFirstFile, key)) acc[`|removed|${key}`] = nodeOfFirstFile[key];
    if (_.has(nodeOfSecondFile, key)) acc[`|added|${key}`] = nodeOfSecondFile[key];
    return acc;
  }, {});

  return treeOfDiff;
};

const getStatusOfKey = (key) => {
  const status = [];
  if (key.startsWith('|added|')) status.push('added');
  if (key.startsWith('|removed|')) status.push('removed');
  if (key.startsWith('|updated/removed|')) status.push('updated/removed');
  if (key.startsWith('|updated/added|')) status.push('updated/added');
  if (status.length === 0) return 'unchanged';
  return status[0];
};

const getDiffAsObj = (tree) => {
  const obj = _.cloneDeep(tree);
  return obj;
};

const getArrayOfKeysStatusesValuesOfFirstLevelNesting = (diffAsObj) => {
  const result = Object.entries(diffAsObj).map(([key, value]) => {
    const status = getStatusOfKey(key);
    let newKey = key;
    if (status !== 'unchanged') newKey = _.trimStart(key, `|${status}|`);
    return [newKey, status, value];
  });
  return result;
};

const getArrayOfObjWithPathStatusValueOfAllChangedKeys = (meaning, status = 'unchanged', path = '') => {
  if (status === 'added' || status === 'removed') return { path, status, meaning };
  if (status === 'updated/added' || status === 'updated/removed') return { path, status, meaning };
  const arrayWithPathsStatusesValues = getArrayOfKeysStatusesValuesOfFirstLevelNesting(meaning)
    .flatMap(([key, status2, value]) => {
      const newPath = `${path}${key}.`;
      if (!_.isObject(value) && status2 === 'unchanged') return [];
      return getArrayOfObjWithPathStatusValueOfAllChangedKeys(value, status2, newPath);
    });
  return arrayWithPathsStatusesValues;
};

export {
  getStatusOfKey, diff,
  getArrayOfKeysStatusesValuesOfFirstLevelNesting,
  getDiffAsObj, getArrayOfObjWithPathStatusValueOfAllChangedKeys,
};
