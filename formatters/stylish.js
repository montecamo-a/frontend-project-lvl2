import _ from 'lodash';
/*
import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';
*/
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
  return formatter(childrens);
};
export default stylish;
/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parser = (fileName) => {
  const format = path.extname(fileName);
  const roadToFile = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', fileName);
  const valueOfFile = readFileSync(roadToFile, 'utf8');
  const result = format === 'JSON' ? JSON.parse(valueOfFile) : yaml.load(valueOfFile);
  return result;
};

const example = diff(parser('file1.json'), parser('file2.json'));
stylish(example);
//console.log(JSON.stringify(example, null, 4));
console.log(stylish(example));
*/
