import _ from 'lodash';

const setProperty = (status, value) => {
  const propertyObj = { status, value };
  return propertyObj;
};

const gendiff = (node1, node2) => {
  if (!_.isObject(node1) || !_.isObject(node2)) {
    if (node1 === node2) return setProperty('unchanged', [node1]);
    return setProperty('changed', [node1, node2]);
  }

  const [keysOfObj1, keysOfObj2] = [Object.keys(node1), Object.keys(node2)];
  const allKeys = _.uniq([...keysOfObj1, ...keysOfObj2]).sort();

  const resultTree = allKeys.reduce((acc, key) => {
    if (_.has(node1, key) && _.has(node2, key)) {
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        acc[key] = setProperty('unchanged', [gendiff(node1[key], node2[key])]);
        return acc;
      }
      acc[key] = gendiff(node1[key], node2[key]);
    } else {
      if (_.has(node1, key)) acc[key] = setProperty('deleted', node1[key]);
      if (_.has(node2, key)) acc[key] = setProperty('added', node2[key]);
    }
    return acc;
  }, {});

  return resultTree;
};
export default gendiff;
