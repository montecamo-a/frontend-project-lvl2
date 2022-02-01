import _ from 'lodash';
import getValue from './getValue.js';

const comparison = (file1, file2) => {
  const [obj1, obj2] = [getValue(file1), getValue(file2)];
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = _.uniq([...keysOfObj1, ...keysOfObj2]).sort();

  const diffAsArray = allKeys.reduce((acc,key) => {
    if (_.has(obj2, key) && _.has(obj1, key)) {
      if (obj2[key] ===  obj1[key]) acc.push([`  ${key}`, obj1[key]]);
      if (obj2[key] !==  obj1[key]) {
        acc.push([`- ${key}`, obj1[key]]);
        acc.push([`+ ${key}`, obj2[key]]);
      }
    } else {
      if (_.has(obj1, key)) acc.push([`- ${key}`, obj1[key]]);
      if (_.has(obj2, key)) acc.push([`+ ${key}`, obj2[key]]);
    }
    return acc;
  }, []);

  const diffAsString = diffAsArray.reduce((acc, [key, value]) => {
    return acc + `${key}: ${value}\n `
  }, '')
  return `{\n ${diffAsString.trim()}\n}`;
}

export default comparison;
