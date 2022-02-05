import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff2.js';

let __filename;
let __dirname;
let correctDifBetweenFile1File2;
let correctDifBetweenFile1File1;
let pathToFile1json;
let pathToFile2json;
let pathToFile1yaml;
let pathToFile2yaml;

beforeEach(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);

  correctDifBetweenFile1File2 = '{\n'
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

  correctDifBetweenFile1File1 = '{\n'
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

  pathToFile1json = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.json');
  pathToFile2json = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.json');
  pathToFile1yaml = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.yaml');
  pathToFile2yaml = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.yaml');
});

describe('Usual work with the relative paths', () => {
  test('compaire json files', () => {
    expect(gendiff('file1.json', 'file2.json')).toEqual(correctDifBetweenFile1File2);
    expect(gendiff('file1.json', 'file1.json')).toEqual(correctDifBetweenFile1File1);
  });
  test('compaire yaml files', () => {
    expect(gendiff('file1.yaml', 'file2.yaml')).toEqual(correctDifBetweenFile1File2);
    expect(gendiff('file1.yaml', 'file1.yaml')).toEqual(correctDifBetweenFile1File1);
  });
});

describe('Usual work with the absolute paths', () => {
  test('compaire json files', () => {
    expect(gendiff(pathToFile1json, pathToFile2json)).toEqual(correctDifBetweenFile1File2);
    expect(gendiff(pathToFile1json, pathToFile1json)).toEqual(correctDifBetweenFile1File1);
  });
  test('compaire yaml files', () => {
    expect(gendiff(pathToFile1yaml, pathToFile2yaml)).toEqual(correctDifBetweenFile1File2);
    expect(gendiff(pathToFile1yaml, pathToFile1yaml)).toEqual(correctDifBetweenFile1File1);
  });
});

describe('Unusual Work - compaire different formats', () => {
  test('compaire json with yaml files (with realative paths)', () => {
    expect(gendiff('file1.json', 'file2.yaml')).toEqual(correctDifBetweenFile1File2);
  });
  test('compaire json with yaml files (with absolute paths)', () => {
    expect(gendiff(pathToFile1yaml, pathToFile2yaml)).toEqual(correctDifBetweenFile1File2);
  });
});
