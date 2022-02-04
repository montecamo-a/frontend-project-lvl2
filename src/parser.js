import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getValue1 = (fileName) => {
  const format = path.extname(fileName);
  const roadToFile = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', fileName);
  const valueOfFile = readFileSync(roadToFile, 'utf8');
  const result = format === 'JSON' ? JSON.parse(valueOfFile) : yaml.load(valueOfFile);
  return result;
};

export default getValue1;
