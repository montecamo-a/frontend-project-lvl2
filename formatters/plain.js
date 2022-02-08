import _ from 'lodash';
import {
  getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildOfUpdatedNode,
  getAddedChildOfUpdatedNode,
} from '../src/diff.js';

const plain = (diffAsTree) => {
  const formatter = (array, paths = '') => {
    const child = getFirstChildOfChildrens(array);
    if (!_.isObject(child)) return [];

    const arrayOfStrings = array
      .flatMap(({ name, status, childrens }) => {
        const newPath = paths.length === 0 ? name : `${paths}.${name}`;

        if (status === 'updated') {
          let removedChildOfUpdatedNode = getRemovedChildOfUpdatedNode(childrens);
          let addedChildOfUpdatedNode = getAddedChildOfUpdatedNode(childrens);
          if (_.isString(removedChildOfUpdatedNode)) removedChildOfUpdatedNode = `'${removedChildOfUpdatedNode}'`;
          if (_.isString(addedChildOfUpdatedNode)) addedChildOfUpdatedNode = `'${addedChildOfUpdatedNode}'`;
          if (_.isObject(removedChildOfUpdatedNode)) removedChildOfUpdatedNode = '[complex value]';
          if (_.isObject(addedChildOfUpdatedNode)) addedChildOfUpdatedNode = '[complex value]';
          return `Property '${newPath}' was updated. From ${removedChildOfUpdatedNode} to ${addedChildOfUpdatedNode}\n`;
        }

        if (status === 'added') {
          let addedChild = getFirstChildOfChildrens(childrens);
          if (_.isString(addedChild)) addedChild = `'${addedChild}'`;
          if (_.isObject(addedChild)) addedChild = '[complex value]';
          return `Property '${newPath}' was added with value: ${addedChild}\n`;
        }

        if (status === 'removed') {
          return `Property '${newPath}' was removed\n`;
        }
        return formatter(childrens, newPath);
      });

    return arrayOfStrings;
  };
  return formatter(getChildrensOfNodeAsArray(diffAsTree)).join('');
};

export default plain;
