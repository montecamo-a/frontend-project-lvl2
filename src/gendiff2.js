import _ from 'lodash';

const gendiff = (node1, node2) => {
  if (!_.isObject(node1) || !_.isObject(node2)) {
    if (node1 === node2) return false;
    return true;
  }

  const [keysOfObj1, keysOfObj2] = [Object.keys(node1), Object.keys(node2)];
  const allKeys = _.uniq([...keysOfObj1, ...keysOfObj2]).sort();

  const resultTree = allKeys.reduce((acc, key) => {
    if (_.has(node1, key) && _.has(node2, key)) {
      if (_.isObjectLike(node1[key]) && _.isObjectLike(node2[key])) {
        acc[`${key}`] = gendiff(node1[key], node2[key]);
        return acc;
      }
      const areChanged = gendiff(node1[key], node2[key]);
      if (!areChanged) {
        acc[`${key}`] = node1[key];
        return acc;
      }
    }
    if (_.has(node1, key)) acc[`- ${key}`] = node1[key];
    if (_.has(node2, key)) acc[`+ ${key}`] = node2[key];
    return acc;
  }, {});

  return resultTree;
};

export default gendiff;
