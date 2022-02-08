import _ from 'lodash';
import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';
import {
  getChildrensOfNodeAsArray,
  getChildOfChildrens, diff,
} from '../src/diff.js';

const stylish = (diffAsTree, replacer = ' ', repeatingSeparator = 4) => {
  const formatter = (value, depth = 1, statusOfUpdatedKey = null) => {
    const child = getChildOfChildrens(value, statusOfUpdatedKey);
    if (!_.isObject(child)) return child;
    const newRepeatingSeparator = repeatingSeparator * depth;
    const arrayOfStrings = value
      .map(({ name, status, childrens }) => {
        let additionalSeparator;
        let item;
        let item2;
        if (status === 'updated') {
          item = `\n${replacer.repeat(newRepeatingSeparator - 2)}- ${name}: ${formatter(childrens, depth + 1, 'removed')}`;
          item2 = `\n${replacer.repeat(newRepeatingSeparator - 2)}+ ${name}: ${formatter(childrens, depth + 1, 'added')}`;
          return `${item}${item2}`;
        }
        if (status === 'added') additionalSeparator = '+ ';
        if (status === 'removed') additionalSeparator = '- ';
        if (status === 'unchanged') additionalSeparator = '  ';
        item = `\n${replacer.repeat(newRepeatingSeparator - 2)}${additionalSeparator}${name}: ${formatter(childrens, depth + 1)}`;
        return `${item}`;
      });

    const getresult = arrayOfStrings.reduce((acc, str, index, array) => {
      if (index === (array.length - 1)) return `${acc}${str}\n${replacer.repeat(newRepeatingSeparator - repeatingSeparator)}}`;
      return acc + str;
    }, '{');
    console.log(getresult);
    return getresult;
  };
  const childrens = getChildrensOfNodeAsArray(diffAsTree);
  return formatter(childrens);
};
export default stylish;

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
//stylish(example);
//console.log(JSON.stringify(example, null, 4));
console.log(stylish(example));
