import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (nameOfFormatter) => {
  switch (nameOfFormatter) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      return stylish;
  }
};
export default getFormatter;
