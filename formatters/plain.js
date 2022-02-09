/* eslint-disable max-len */
import _ from 'lodash';
import {
  getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildOfUpdatedNode,
  getAddedChildOfUpdatedNode,
} from '../src/diff.js';

const plain = (diffAsTree) => {
  const valueFormatter = (value) => {
    if (_.isString(value)) return `'${value}'`;
    if (_.isObject(value)) return '[complex value]';
    return `${value}`;
  };

  const arrayFormatter = (array, paths = '') => {
    const child = getFirstChildOfChildrens(array);
    if (!_.isObject(child)) return [];

    const arrayOfStrings = array.flatMap(({ name, status, childrens }) => {
      const newPath = paths.length === 0 ? name : `${paths}.${name}`;
      switch (status) {
        case 'updated':
          return `Property '${newPath}' was updated. From`
                  + ` ${valueFormatter(getRemovedChildOfUpdatedNode(childrens))} to`
                  + ` ${valueFormatter(getAddedChildOfUpdatedNode(childrens))}\n`;

        case 'added':
          return `Property '${newPath}' was added with value: ${valueFormatter(getFirstChildOfChildrens(childrens))}\n`;

        case 'removed':
          return `Property '${newPath}' was removed\n`;

        default:
          return arrayFormatter(childrens, newPath);
      }
    });

    return arrayOfStrings;
  };
  const childrens = getChildrensOfNodeAsArray(diffAsTree);
  switch (childrens.length) {
    case 0:
      return '';
    default:
      return arrayFormatter(getChildrensOfNodeAsArray(diffAsTree)).join('').trim();
  }
};

export default plain;
