import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (nameOfFormatter) => {
  let formatter;
  if (nameOfFormatter === 'plain') formatter = plain;
  if (nameOfFormatter === 'stylish') formatter = stylish;
  return formatter;
};
export default getFormatter;
