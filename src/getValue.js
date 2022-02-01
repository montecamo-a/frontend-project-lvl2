import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getValue = (fileName) => {
  const roadToFile = path.resolve(__dirname, '..', '__fixtures__', fileName);
  const valueOfFile = readFileSync(roadToFile, 'utf8');
  const result = JSON.parse(valueOfFile);
  return result;
};

export default getValue;
