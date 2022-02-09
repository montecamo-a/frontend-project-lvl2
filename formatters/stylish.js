/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';
import {
  getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildAsArrayOfUpdatedNode,
  getAddedChildAsArrayOfUpdatedNode,
} from '../src/diff.js';

const stylish = (diffAsTree, replacer = ' ', repeatingSeparator = 4) => {
  const formatter = (array, depth = 1) => {
    const child = getFirstChildOfChildrens(array);
    if (!_.isObject(child)) return `${child}`;

    const newRepeatingSeparator = repeatingSeparator * depth;

    const arrayOfStrings = array.map(({ name, status, childrens }) => {
      switch (status) {
        case 'updated':
          return `\n${replacer.repeat(newRepeatingSeparator - 2)}- ${name}: ${formatter(getRemovedChildAsArrayOfUpdatedNode(childrens), depth + 1)}`
          + `\n${replacer.repeat(newRepeatingSeparator - 2)}+ ${name}: ${formatter(getAddedChildAsArrayOfUpdatedNode(childrens), depth + 1)}`;

        case 'added':
          return `\n${replacer.repeat(newRepeatingSeparator - 2)}+ ${name}: ${formatter(childrens, depth + 1)}`;

        case 'removed':
          return `\n${replacer.repeat(newRepeatingSeparator - 2)}- ${name}: ${formatter(childrens, depth + 1)}`;

        case 'unchanged':
          return `\n${replacer.repeat(newRepeatingSeparator - 2)}  ${name}: ${formatter(childrens, depth + 1)}`;

        default:
          break;
      }
    });

    const getresult = arrayOfStrings.reduce((acc, str, index, array1) => {
      switch (index) {
        case array1.length - 1:
          return `${acc}${str}\n${replacer.repeat(newRepeatingSeparator - repeatingSeparator)}}`;
        default:
          return acc + str;
      }
    }, '{');

    return getresult;
  };
  const childrens = getChildrensOfNodeAsArray(diffAsTree);
  switch (childrens.length) {
    case 0:
      return '{\n}';
    default:
      return formatter(childrens);
  }
};
export default stylish;
