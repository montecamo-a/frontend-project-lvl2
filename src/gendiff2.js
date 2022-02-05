import stylish from './stylish.js';
import parser from './parser.js';
import { diff } from './diff.js';

const gendiff = (filepath1, filepath2, formatName = stylish) => {
  const parsedValueOfTheFirstFile = parser(filepath1);
  const parsedValueOfTheSecondFile = parser(filepath2);
  const treeOfDiff = diff(parsedValueOfTheFirstFile, parsedValueOfTheSecondFile);
  return formatName(treeOfDiff);
};

export default gendiff;
