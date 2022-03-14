import plain from './plain.js';
import stylish from './stylish.js';

export default (type) => {
  switch (type) {
    case 'plain':
      return plain;
    case 'stylish':
    default:
      return stylish;
  }
};
