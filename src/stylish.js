import _ from 'lodash';

const stringify = (value, replacer = ' ', countReplace = 4) => {
  const goToDepth = (value1, depth = 1) => {
    if (!_.isObject(value1)) return `${value1}`;

    const currentReplacerLength = countReplace * depth;
    const getStrings = Object.entries(value1).map(([key, value2]) => `\n${replacer.repeat(currentReplacerLength - 2)}${key}: ${goToDepth(value2, depth + 1)}`);

    const getresult = getStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc}${str}\n${replacer.repeat(currentReplacerLength - countReplace)}}`;
      return acc + str;
    }, '{');

    return getresult;
  };
  return goToDepth(value);
};
export default stringify;
