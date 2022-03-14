import { isObject } from 'lodash-es';

const printOffset = (length) => {
  let offset = '';

  for (let i = 0; i < length; i++) {
    offset += ' ';
  }

  return offset;
};

const printType = (type) => {
  switch (type) {
    case 'EQUAL':
      return ' ';
    case 'MISSING':
      return '-';
    case 'EXTRA':
      return '+';
  }
};

const stylish = (diffs, offset = 0) => {
  const printValue = (value) => {
    if (Array.isArray(value)) {
      return stylish(value, offset + 4);
    }

    if (isObject(value)) {
      return stylish(
        Object.entries(value).map(([key, value]) => ({
          type: 'EQUAL',
          key,
          value,
        })),
        offset + 4
      );
    }

    return value;
  };

  const lines = diffs
    .flatMap((diff) => {
      if (diff.type === 'UPDATE') {
        return [
          { type: 'MISSING', key: diff.key, value: diff.prevValue },
          { type: 'EXTRA', key: diff.key, value: diff.value },
        ];
      }

      return diff;
    })
    .map(({ key, value, type }) => {
      return `${printOffset(offset + 2)}${printType(type)} ${key}: ${printValue(
        value
      )}`;
    })
    .join('\n');

  return `{\n${lines}\n${printOffset(offset)}}`;
};

export default stylish;
