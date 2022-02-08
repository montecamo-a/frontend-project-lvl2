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
    const arrayOfStrings = array
      .map(({ name, status, childrens }) => {
        let additionalSeparator;
        if (status === 'updated') {
          const removedChildOfUpdatedNode = getRemovedChildAsArrayOfUpdatedNode(childrens);
          const addedChildOfUpdatedNode = getAddedChildAsArrayOfUpdatedNode(childrens);

          return `\n${replacer.repeat(newRepeatingSeparator - 2)}- ${name}: ${formatter(removedChildOfUpdatedNode, depth + 1)}`
          + `\n${replacer.repeat(newRepeatingSeparator - 2)}+ ${name}: ${formatter(addedChildOfUpdatedNode, depth + 1)}`;
        }
        if (status === 'added') additionalSeparator = '+ ';
        if (status === 'removed') additionalSeparator = '- ';
        if (status === 'unchanged') additionalSeparator = '  ';
        return `\n${replacer.repeat(newRepeatingSeparator - 2)}${additionalSeparator}${name}: ${formatter(childrens, depth + 1)}`;
      });

    const getresult = arrayOfStrings.reduce((acc, str, index, array1) => {
      if (index === (array1.length - 1)) return `${acc}${str}\n${replacer.repeat(newRepeatingSeparator - repeatingSeparator)}}`;
      return acc + str;
    }, '{');
    return getresult;
  };
  const childrens = getChildrensOfNodeAsArray(diffAsTree);
  if (childrens.length === 0) return '{\n}';
  return formatter(childrens);
};
export default stylish;
