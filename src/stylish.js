import _ from 'lodash';

const stylish = (value, replacer = ' ', countReplace = 4) => {
  const goToDepth = (value1, depth = 1) => {
    if (!_.isObject(value1)) return `${value1}`;

    const currentReplacerLength = countReplace * depth;
    const getStrings = Object.entries(value1).map(([key, value2]) => {
      let trimLengthReplacer = 2;
      if (!key.startsWith('+') && !key.startsWith('-')) trimLengthReplacer = 0;
      const result = `\n${replacer.repeat(currentReplacerLength - trimLengthReplacer)}${key}: ${goToDepth(value2, depth + 1)}`;
      return result;
    });
    const getresult = getStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc}${str}\n${replacer.repeat(currentReplacerLength - countReplace)}}`;
      return acc + str;
    }, '{');

    return getresult;
  };
  return goToDepth(value);
};
export default stylish;
