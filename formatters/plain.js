import { isObject } from 'lodash-es';

const printPrimitive = (value) => {
  if (isObject(value)) return '[complex value]';

  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const TEMPLATES = {
  EXTRA: (diff, path) =>
    `Property ${printPrimitive(path)} was added with value: ${printPrimitive(
      diff.value
    )}`,
  MISSING: (diff, path) => `Property ${printPrimitive(path)} was removed`,
  UPDATE: (diff, path) =>
    `Property ${printPrimitive(path)} was updated. From ${printPrimitive(
      diff.prevValue
    )} to ${printPrimitive(diff.value)}`,
};

const printDiff = (diff, path) => TEMPLATES[diff.type](diff, path);

const plain = (diffs, path = []) =>
  diffs
    .filter((d) => d.type !== 'EQUAL' || Array.isArray(d.value))
    .flatMap(({ type, value, key, prevValue }) => {
      if (Array.isArray(value)) return plain(value, [...path, key]);

      return printDiff(
        { type, value, key, prevValue },
        [...path, key].join('.')
      );
    })
    .join('\n');

export default plain;
