import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff2.js';

let __filename;
let __dirname;
let firstCorrectDiff;
let secondCorrectDiff;
let pathToFile1j;
let pathToFile2j;
let pathToFile1y;
let pathToFile2y;

beforeEach(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  pathToFile1j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.json');
  pathToFile2j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.json');
  pathToFile1y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.yaml');
  pathToFile2y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.yaml');

  firstCorrectDiff = '{\n'
                                  + '    common: {\n'
                                  + '      + follow: false\n'
                                  + '        setting1: Value 1\n'
                                  + '      - setting2: 200\n'
                                  + '      - setting3: true\n'
                                  + '      + setting3: null\n'
                                  + '      + setting4: blah blah\n'
                                  + '      + setting5: {\n'
                                  + '            key5: value5\n'
                                  + '        }\n'
                                  + '        setting6: {\n'
                                  + '            doge: {\n'
                                  + '              - wow: \n'
                                  + '              + wow: so much\n'
                                  + '            }\n'
                                  + '            key: value\n'
                                  + '          + ops: vops\n'
                                  + '        }\n'
                                  + '    }\n'
                                  + '    group1: {\n'
                                  + '      - baz: bas\n'
                                  + '      + baz: bars\n'
                                  + '        foo: bar\n'
                                  + '      - nest: {\n'
                                  + '            key: value\n'
                                  + '        }\n'
                                  + '      + nest: str\n'
                                  + '    }\n'
                                  + '  - group2: {\n'
                                  + '        abc: 12345\n'
                                  + '        deep: {\n'
                                  + '            id: 45\n'
                                  + '        }\n'
                                  + '    }\n'
                                  + '  + group3: {\n'
                                  + '        deep: {\n'
                                  + '            id: {\n'
                                  + '                number: 45\n'
                                  + '            }\n'
                                  + '        }\n'
                                  + '        fee: 100500\n'
                                  + '    }\n'
                                  + '}';

  secondCorrectDiff = '{\n'
                                   + '    common: {\n'
                                   + '        setting1: Value 1\n'
                                   + '        setting2: 200\n'
                                   + '        setting3: true\n'
                                   + '        setting6: {\n'
                                   + '            doge: {\n'
                                   + '                wow: \n'
                                   + '            }\n'
                                   + '            key: value\n'
                                   + '        }\n'
                                   + '    }\n'
                                   + '    group1: {\n'
                                   + '        baz: bas\n'
                                   + '        foo: bar\n'
                                   + '        nest: {\n'
                                   + '            key: value\n'
                                   + '        }\n'
                                   + '    }\n'
                                   + '    group2: {\n'
                                   + '        abc: 12345\n'
                                   + '        deep: {\n'
                                   + '            id: 45\n'
                                   + '        }\n'
                                   + '    }\n'
                                   + '}';
});

describe('Main work', () => {
  test('Compaire json files when have relative paths', () => {
    expect(gendiff('file1.json', 'file2.json')).toEqual(firstCorrectDiff);
    expect(gendiff('file1.json', 'file1.json')).toEqual(secondCorrectDiff);
  });
  test('Compaire yaml files when have relative paths', () => {
    expect(gendiff('file1.yaml', 'file2.yaml')).toEqual(firstCorrectDiff);
    expect(gendiff('file1.yaml', 'file1.yaml')).toEqual(secondCorrectDiff);
  });
  test('Compaire json files when have absolute paths', () => {
    expect(gendiff(pathToFile1j, pathToFile2j)).toEqual(firstCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile1j)).toEqual(secondCorrectDiff);
  });
  test('Compaire yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y)).toEqual(firstCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile1y)).toEqual(secondCorrectDiff);
  });
});

describe('Additional work', () => {
  test('Compaire json with yaml files when have realative paths', () => {
    expect(gendiff('file1.json', 'file2.yaml')).toEqual(firstCorrectDiff);
  });
  test('Compaire json with yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y)).toEqual(firstCorrectDiff);
  });
});
