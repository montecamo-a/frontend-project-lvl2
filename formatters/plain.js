import _ from 'lodash';
import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';
import {
  diff, getChildrensOfNodeAsArray,
  getFirstChildOfChildrens, getRemovedChildAsArrayOfUpdatedNode,
  getAddedChildAsArrayOfUpdatedNode, getRemovedChildOfUpdatedNode,
  getAddedChildOfUpdatedNode,
} from '../src/diff.js';

const plain = (diffAsTree) => {
  const formatter = (array, paths = '') => {
    const child = getFirstChildOfChildrens(array);
    if (!_.isObject(child)) return [];

    const arrayOfStrings = array
      .flatMap(({ name, status, childrens }) => {
        const newPath = paths.length === 0 ? name : `${paths}.${name}`;

        if (status === 'updated') {
          let removedChildOfUpdatedNode = getRemovedChildOfUpdatedNode(childrens);
          let addedChildOfUpdatedNode = getAddedChildOfUpdatedNode(childrens);
          if (_.isString(removedChildOfUpdatedNode)) removedChildOfUpdatedNode = `'${removedChildOfUpdatedNode}'`;
          if (_.isObject(removedChildOfUpdatedNode)) removedChildOfUpdatedNode = '[complex value]';
          if (_.isObject(addedChildOfUpdatedNode)) addedChildOfUpdatedNode = '[complex value]';
          if (_.isString(addedChildOfUpdatedNode)) addedChildOfUpdatedNode = `'${addedChildOfUpdatedNode}'`;
          return `Property '${newPath}' was updated. From ${removedChildOfUpdatedNode} to ${addedChildOfUpdatedNode}\n`;
        }

        if (status === 'added') {
          let addedChild = getFirstChildOfChildrens(childrens);
          if (_.isString(addedChild)) addedChild = `'${addedChild}'`;
          if (_.isObject(addedChild)) addedChild = '[complex value]';
          return `Property '${newPath}' was added with value: ${addedChild}\n`;
        }

        if (status === 'removed') {
          return `Property '${newPath}' was removed\n`;
        }
        return formatter(childrens, newPath);
      });

    return arrayOfStrings;
  };
  const childrens = getChildrensOfNodeAsArray(diffAsTree);
  const strings = formatter(childrens);
  const result = strings.join('');
  return result;
};

export default plain;

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
plain(example);
//console.log(JSON.stringify(example, null, 4));
console.log(plain(example));