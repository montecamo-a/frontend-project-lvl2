import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let correctDifBetFile1File2;
let correctDifBetFile1File1;
let correctDifBetFile3File1;
let pathToF1j;
let pathToF1y;
let pathToF2j;
let pathToF2y;
let pathToF3j;
let pathToF3y;

beforeEach(() => {
  correctDifBetFile1File2 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  correctDifBetFile1File1 = '{\n    follow: false\n    host: hexlet.io\n    proxy: 123.234.53.22\n    timeout: 50\n}';
  correctDifBetFile3File1 = '{\n  + follow: false\n  + host: hexlet.io\n  + proxy: 123.234.53.22\n  + timeout: 50\n}';

  pathToF1j = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file1.json');
  pathToF2j = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file2.json');
  pathToF3j = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file3.json');

  pathToF1y = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file1.yaml');
  pathToF2y = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file2.yml');
  pathToF3y = path.resolve(__dirname, '..', '__fixtures__/flatvolumes', 'file3.yaml');
});

describe('usual Work with .json', () => {
  test('with relative path', () => {
    expect(gendiff('file1.json', 'file2.json')).toEqual(correctDifBetFile1File2);
    expect(gendiff('file1.json', 'file1.json')).toEqual(correctDifBetFile1File1);
    expect(gendiff('file3.json', 'file1.json')).toEqual(correctDifBetFile3File1);
  });
  test('with absolute path', () => {
    expect(gendiff(pathToF1j, pathToF2j)).toEqual(correctDifBetFile1File2);
    expect(gendiff(pathToF1j, pathToF1j)).toEqual(correctDifBetFile1File1);
    expect(gendiff(pathToF3j, pathToF1j)).toEqual(correctDifBetFile3File1);
  });
});

describe('usual Work with .yaml || .yml', () => {
  test('with relative path', () => {
    expect(gendiff('file1.yaml', 'file2.yml')).toEqual(correctDifBetFile1File2);
    expect(gendiff('file1.yaml', 'file1.yaml')).toEqual(correctDifBetFile1File1);
    expect(gendiff('file3.yaml', 'file1.yaml')).toEqual(correctDifBetFile3File1);
  });
  test('with absolute path', () => {
    expect(gendiff(pathToF1y, pathToF2y)).toEqual(correctDifBetFile1File2);
    expect(gendiff(pathToF1y, pathToF1y)).toEqual(correctDifBetFile1File1);
    expect(gendiff(pathToF3y, pathToF1y)).toEqual(correctDifBetFile3File1);
  });
});
