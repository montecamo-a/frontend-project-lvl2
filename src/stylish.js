import _ from 'lodash';
import { getStatus, getValue } from './gendiff2.js';

const stringify = (value, replacer = ' ', replacerCounter = 2) => {
  const [added, deleted, unchanged] = [`+${replacer}`, `-${replacer}`, `${replacer.repeat(2)}`];

  const goToDepth = (meaning, depth = 1, point = 0) => {
    if (!_.isObject(meaning)) {
      if (point === 0) return `${getValue(meaning, 0)}`;
      return `${getValue(meaning, 1)}`;
    }
    const lengthOfFullReplacer = replacerCounter * depth;

    const getStrings = Object.entries(value).flatMap(([key, property]) => {
      const newStatus = getStatus(property);
      let additionalRepalcer;

      if (newStatus === 'changed') {
        const deletedNode = `\n${replacer.repeat(lengthOfFullReplacer - 2)}${deleted}${key}: ${goToDepth(property, depth + 1, point)}`;
        const addedNode = `\n${replacer.repeat(lengthOfFullReplacer - 2)}${added}${key}: ${goToDepth(property, depth + 1, point + 1)}`;
        return [deletedNode, addedNode];
      }

      if (newStatus === 'added') additionalRepalcer = added;
      if (newStatus === 'deleted') additionalRepalcer = deleted;
      if (newStatus === 'unchanged') additionalRepalcer = unchanged;
      return `\n${replacer.repeat(lengthOfFullReplacer - 2)}${additionalRepalcer}${key}: ${goToDepth(property, depth + 1)}`;
    });

    const getresult = getStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc + str}\n${replacer.repeat(lengthOfFullReplacer - replacerCounter)}}`;
      return acc + str;
    }, '{');

    return getresult;
  };
  return goToDepth(value);
};

export default stringify;
