import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToFile1j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.json');
const pathToFile2j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.json');
const pathToFile3j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file3.json');
const pathToFile1y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.yaml');
const pathToFile2y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.yaml');
const pathToFile3y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file3.yaml');

const firstCorrectDiff = '{\n'
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

const secondCorrectDiff = '{\n'
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

const thirdCorrectDiff = '{\n'
                                   + '  - common: {\n'
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
                                   + '  - group1: {\n'
                                   + '        baz: bas\n'
                                   + '        foo: bar\n'
                                   + '        nest: {\n'
                                   + '            key: value\n'
                                   + '        }\n'
                                   + '    }\n'
                                   + '  - group2: {\n'
                                   + '        abc: 12345\n'
                                   + '        deep: {\n'
                                   + '            id: 45\n'
                                   + '        }\n'
                                   + '    }\n'
                                   + '}';
const fourthCorrectDiff = '{\n'
                    + '}';

describe('Main work', () => {
  test('Compaire json files when have relative paths', () => {
    expect(gendiff('file1.json', 'file2.json')).toBe(firstCorrectDiff);
    expect(gendiff('file1.json', 'file1.json')).toBe(secondCorrectDiff);
    expect(gendiff('file1.json', 'file3.json')).toEqual(thirdCorrectDiff);
    expect(gendiff('file3.json', 'file3.json')).toEqual(fourthCorrectDiff);
  });
  test('Compaire yaml files when have relative paths', () => {
    expect(gendiff('file1.yaml', 'file2.yaml')).toBe(firstCorrectDiff);
    expect(gendiff('file1.yaml', 'file1.yaml')).toBe(secondCorrectDiff);
    expect(gendiff('file1.yaml', 'file3.yaml')).toBe(thirdCorrectDiff);
    expect(gendiff('file3.yaml', 'file3.yaml')).toBe(fourthCorrectDiff);
  });
  test('Compaire json files when have absolute paths', () => {
    expect(gendiff(pathToFile1j, pathToFile2j)).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile1j)).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile3j)).toBe(thirdCorrectDiff);
    expect(gendiff(pathToFile3j, pathToFile3j)).toBe(fourthCorrectDiff);
  });
  test('Compaire yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y)).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile1y)).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile3y)).toBe(thirdCorrectDiff);
    expect(gendiff(pathToFile3y, pathToFile3y)).toBe(fourthCorrectDiff);
  });
});

describe('Additional work', () => {
  test('Compaire json with yaml files when have realative paths', () => {
    expect(gendiff('file1.json', 'file2.yaml')).toBe(firstCorrectDiff);
    expect(gendiff('file1.json', 'file1.yaml')).toBe(secondCorrectDiff);
    expect(gendiff('file1.json', 'file3.yaml')).toBe(thirdCorrectDiff);
    expect(gendiff('file3.json', 'file3.yaml')).toBe(fourthCorrectDiff);
  });
  test('Compaire json with yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y)).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile1y)).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile3y)).toBe(thirdCorrectDiff);
    expect(gendiff(pathToFile3j, pathToFile3y)).toBe(fourthCorrectDiff);
  });
});
