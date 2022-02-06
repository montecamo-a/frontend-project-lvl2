import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (nameOfFormatter) => {
  let formatter;
  if (nameOfFormatter === 'plain') formatter = plain;
  if (nameOfFormatter === 'stylish') formatter = stylish;
  if (nameOfFormatter === 'json') formatter = json;
  return formatter;
};
export default getFormatter;
