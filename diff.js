import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { uniq } from 'lodash-es';

const diffJSON = (json1, json2) => {
  const diffs = uniq([...Object.keys(json1), ...Object.keys(json2)])
    .sort()
    .flatMap((key) => {
      if (json1[key] === json2[key]) {
        return `  ${key}: ${json1[key]}`;
      }

      if (key in json1 && key in json2) {
        return [`- ${key}: ${json1[key]}`, `+ ${key}: ${json2[key]}`];
      }

      if (key in json1) {
        return `- ${key}: ${json1[key]}`;
      }

      return `+ ${key}: ${json2[key]}`;
    });

  return `
{
  ${diffs.join('\n  ')}
}
`;
};

const makeParser = (src) => {
  const ext = path.extname(src);

  if (['.yaml', '.yml'].includes(ext)) {
    return yaml.load;
  }

  return JSON.parse;
};

export default (file1, file2) =>
  diffJSON(
    makeParser(file1)(fs.readFileSync(file1)),
    makeParser(file2)(fs.readFileSync(file2))
  );
