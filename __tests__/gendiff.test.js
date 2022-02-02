import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiffFlatFiles from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let correctDifBetFile1File2;
let correctDifBetFile1File1;
let correctDifBetFile3File1;
let pathToFile1;
let pathToFile2;
let pathToFile3;

beforeEach(() => {
  correctDifBetFile1File2 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  correctDifBetFile1File1 = '{\n    follow: false\n    host: hexlet.io\n    proxy: 123.234.53.22\n    timeout: 50\n}';
  correctDifBetFile3File1 = '{\n  + follow: false\n  + host: hexlet.io\n  + proxy: 123.234.53.22\n  + timeout: 50\n}';
  pathToFile1 = path.resolve(__dirname, '..', '__fixtures__', 'file1.json');
  pathToFile2 = path.resolve(__dirname, '..', '__fixtures__', 'file2.json');
  pathToFile3 = path.resolve(__dirname, '..', '__fixtures__', 'file3.json');
});

describe('usual Work', () => {
  test('with relative path', () => {
    expect(genDiffFlatFiles('file1.json', 'file2.json')).toEqual(correctDifBetFile1File2);
    expect(genDiffFlatFiles('file1.json', 'file1.json')).toEqual(correctDifBetFile1File1);
    expect(genDiffFlatFiles('file3.json', 'file1.json')).toEqual(correctDifBetFile3File1);
  });
  test('with absolute path', () => {
    expect(genDiffFlatFiles(pathToFile1, pathToFile2)).toEqual(correctDifBetFile1File2);
    expect(genDiffFlatFiles(pathToFile1, pathToFile1)).toEqual(correctDifBetFile1File1);
    expect(genDiffFlatFiles(pathToFile3, pathToFile1)).toEqual(correctDifBetFile3File1);
  });
});
