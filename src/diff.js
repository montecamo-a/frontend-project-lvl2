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

export {
  getStatusOfKey, diff,
  getArrayOfKeysStatusesValuesOfFirstLevelNesting,
  getDiffAsObj,
};
