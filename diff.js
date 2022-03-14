import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { uniq, isObject } from 'lodash-es';

const diff = (json1, json2) =>
  uniq([...Object.keys(json1), ...Object.keys(json2)])
    .sort()
    .map((key) => {
      if (isObject(json1[key]) && isObject(json2[key])) {
        return { type: 'EQUAL', key, value: diff(json1[key], json2[key]) };
      }

      if (json1[key] === json2[key]) {
        return { type: 'EQUAL', key, value: json1[key] };
      }

      if (key in json1 && key in json2) {
        return {
          type: 'UPDATE',
          key,
          prevValue: json1[key],
          value: json2[key],
        };
      }

      if (key in json1) {
        return { type: 'MISSING', key, value: json1[key] };
      }

      return { type: 'EXTRA', key, value: json2[key] };
    });

const makeParser = (src) => {
  const ext = path.extname(src);

  if (['.yaml', '.yml'].includes(ext)) {
    return yaml.load;
  }

  return JSON.parse;
};

export default (file1, file2) =>
  diff(
    makeParser(file1)(fs.readFileSync(file1)),
    makeParser(file2)(fs.readFileSync(file2))
  );
