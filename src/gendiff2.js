import getFormatter from '../formatters/index.js';
import parser from './parser.js';
import { diff } from './diff.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedValueOfTheFirstFile = parser(filepath1);
  const parsedValueOfTheSecondFile = parser(filepath2);
  const treeOfDiff = diff(parsedValueOfTheFirstFile, parsedValueOfTheSecondFile);
  const formatter = getFormatter(formatName);
  return formatter(treeOfDiff);
};

export default gendiff;
