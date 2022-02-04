import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff2.js';
import stringify from '../src/stylish.js';
import getValue from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let correctDifBetFile1File2;
let correctDifBetFile1File1;
let pathToF1j;
let pathToF1y;
let pathToF2j;
let pathToF2y;

beforeEach(() => {
  correctDifBetFile1File2 = '{\n'
                          + '    common:\n'
                          + '      + follow: false\n'
                          + '        setting1: Value 1\n'
                          + '      - setting2: 200\n'
                          + '      - setting3: null\n'
                          + '        setiing4: blah blah\n'
                          + '      + setting5: {\n'
                          + '            key5: value5\n'
                          + '        }\n'
                          + '        setting6: {\n'
                          + '            dog6: {\n'
                          + '              - wow:\n'
                          + '              + wow: so much\n'
                          + '            }\n'
                          + '            key: value\n'
                          + '          + ops: vops\n'
                          + '        }\n'
                          + '     }\n'
                          + '     group1: {\n'
                          + '       - baz: bas\n'
                          + '       + baz: bars\n'
                          + '         foo: bar\n'
                          + '       - nest: {\n'
                          + '             key: value'
                          + '         }\n'
                          + '       + nest: str\n'
                          + '     }\n'
                          + '   - group2: {\n'
                          + '         abc: 12345\n'
                          + '         deep: {\n'
                          + '             id: 45\n'
                          + '         }\n'
                          + '     }\n'
                          + '   + group3: {\n'
                          + '         deep: {\n'
                          + '             id: {\n'
                          + '                 number; 45\n'
                          + '             }\n'
                          + '         }\n'
                          + '         fee: 100500\n'
                          + '     }\n'
                          + '}';

  correctDifBetFile1File1 = '{\n'
                          + '    common:\n'
                          + '        follow: false\n'
                          + '        setting1: Value 1\n'
                          + '        setting2: 200\n'
                          + '        setting3: null\n'
                          + '        setting6: {\n'
                          + '            dog6: {\n'
                          + '                wow:\n'
                          + '            }\n'
                          + '            key: value\n'
                          + '        }\n'
                          + '     }\n'
                          + '     group1: {\n'
                          + '         baz: bas\n'
                          + '         foo: bar\n'
                          + '         nest: {\n'
                          + '             key: value'
                          + '         }\n'
                          + '     }\n'
                          + '     group2: {\n'
                          + '         abc: 12345\n'
                          + '         deep: {\n'
                          + '             id: 45\n'
                          + '         }\n'
                          + '     }\n'
                          + '}';

  pathToF1j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.json');
  pathToF2j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.json');

  pathToF1y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.yaml');
  pathToF2y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.yaml');
});

describe('usual Work with .json', () => {
  test('with relative path', () => {
    expect(stringify(gendiff(getValue('file1.json'), getValue('file2.json')))).toEqual(correctDifBetFile1File2);
    expect(stringify(gendiff('file1.json', 'file1.json'))).toEqual(correctDifBetFile1File1);
    // expect(gendiff('file3.json', 'file1.json')).toEqual(correctDifBetFile3File1);
  });
  test('with absolute path', () => {
    expect(stringify(gendiff(pathToF1j, pathToF2j))).toEqual(correctDifBetFile1File2);
    expect(stringify(gendiff(pathToF1j, pathToF1j))).toEqual(correctDifBetFile1File1);
    // expect(gendiff(pathToF3j, pathToF1j)).toEqual(correctDifBetFile3File1);
  });
});

describe('usual Work with .yaml || .yml', () => {
  test('with relative path', () => {
    expect(stringify(gendiff(getValue('file1.yaml'), getValue('file2.yaml')))).toEqual(correctDifBetFile1File2);
    expect(stringify(gendiff(getValue('file1.yaml'), getValue('file1.yaml')))).toEqual(correctDifBetFile1File1);
    // expect(gendiff('file3.yaml', 'file1.yaml')).toEqual(correctDifBetFile3File1);
  });
  test('with absolute path', () => {
    expect(stringify(gendiff(pathToF1y, pathToF2y))).toEqual(correctDifBetFile1File2);
    expect(stringify(gendiff(pathToF1y, pathToF1y))).toEqual(correctDifBetFile1File1);
    // expect(gendiff(pathToF3y, pathToF1y)).toEqual(correctDifBetFile3File1);
  });
});
