import _ from 'lodash';
import {
  getArrayOfKeysStatusesValuesOfFirstLevelNesting,
  getDiffAsObj,
} from './diff.js';

const stylish = (diff, replacer = ' ', repeatingSeparator = 4) => {
  const formatter = (meainig, depth = 1) => {
    if (!_.isObject(meainig)) return `${meainig}`;

    const newRepeatingSeparator = repeatingSeparator * depth;

    const arrayOfStrings = getArrayOfKeysStatusesValuesOfFirstLevelNesting(meainig)
      .flatMap(([key, status, value]) => {
        let additionalSeparator;
        const item = [];
        if (status === 'updated') {
          item.push(`\n${replacer.repeat(newRepeatingSeparator - 2)}- ${key}: ${formatter(value, depth + 1)}`);
          item.push(`\n${replacer.repeat(newRepeatingSeparator - 2)}+ ${key}: ${formatter(value, depth + 1)}`);
          return item;
        }
        if (status === 'added') additionalSeparator = '+ ';
        if (status === 'removed') additionalSeparator = '- ';
        if (status === 'unchanged') additionalSeparator = '  ';
        item.push(`\n${replacer.repeat(newRepeatingSeparator - 2)}${additionalSeparator}${key}: ${formatter(value, depth + 1)}`);
        return item;
      });

    const getresult = arrayOfStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc}${str}\n${replacer.repeat(newRepeatingSeparator - repeatingSeparator)}}`;
      return acc + str;
    }, '{');

    return getresult;
  };

  const diffAsObj = getDiffAsObj(diff);
  return formatter(diffAsObj);
};
export default stylish;
