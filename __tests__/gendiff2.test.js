import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff2.js';

let __filename;
let __dirname;
let firstCorrectDifWhenUseStylish;
let firstCorrectDifWhenUsePlain;
let firstCorrectDifWhenUseJest;
let secondCorrectDifWhenUseStylish;
let secondCorrectDifWhenUsePlain;
let pathToFile1j;
let pathToFile2j;
let pathToFile1y;
let pathToFile2y;

beforeAll(() => {
  __filename = fileURLToPath(import.meta.url);
  __dirname = dirname(__filename);
  pathToFile1j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.json');
  pathToFile2j = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.json');
  pathToFile1y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file1.yaml');
  pathToFile2y = path.resolve(__dirname, '..', '__fixtures__/recursionVolumes', 'file2.yaml');
});

describe('When formateName = stylish', () => {
  beforeEach(() => {
    firstCorrectDifWhenUseStylish = '{\n'
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

    secondCorrectDifWhenUseStylish = '{\n'
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
      expect(gendiff('file1.json', 'file2.json')).toEqual(firstCorrectDifWhenUseStylish);
      expect(gendiff('file1.json', 'file1.json')).toEqual(secondCorrectDifWhenUseStylish);
    });
    test('Compaire yaml files when have relative paths', () => {
      expect(gendiff('file1.yaml', 'file2.yaml')).toEqual(firstCorrectDifWhenUseStylish);
      expect(gendiff('file1.yaml', 'file1.yaml')).toEqual(secondCorrectDifWhenUseStylish);
    });
    test('Compaire json files when have absolute paths', () => {
      expect(gendiff(pathToFile1j, pathToFile2j)).toEqual(firstCorrectDifWhenUseStylish);
      expect(gendiff(pathToFile1j, pathToFile1j)).toEqual(secondCorrectDifWhenUseStylish);
    });
    test('Compaire yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y)).toEqual(firstCorrectDifWhenUseStylish);
      expect(gendiff(pathToFile1y, pathToFile1y)).toEqual(secondCorrectDifWhenUseStylish);
    });
  });

  describe('Additional work', () => {
    test('Compaire json with yaml files when have realative paths', () => {
      expect(gendiff('file1.json', 'file2.yaml')).toEqual(firstCorrectDifWhenUseStylish);
    });
    test('Compaire json with yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y)).toEqual(firstCorrectDifWhenUseStylish);
    });
  });
});

describe('When formateName = plain', () => {
  beforeEach(() => {
    firstCorrectDifWhenUsePlain = "Property 'common.follow' was added with value: false\n"
                                + "Property 'common.setting2' was removed\n"
                                + "Property 'common.setting3' was updated. From true to null\n"
                                + "Property 'common.setting4' was added with value: 'blah blah'\n"
                                + "Property 'common.setting5' was added with value: [complex value]\n"
                                + "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n"
                                + "Property 'common.setting6.ops' was added with value: 'vops'\n"
                                + "Property 'group1.baz' was updated. From 'bas' to 'bars'\n"
                                + "Property 'group1.nest' was updated. From [complex value] to 'str'\n"
                                + "Property 'group2' was removed\n"
                                + "Property 'group3' was added with value: [complex value]\n";

    secondCorrectDifWhenUsePlain = '';
  });

  describe('Main work', () => {
    test('Compaire json files when have relative paths', () => {
      expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(firstCorrectDifWhenUsePlain);
      expect(gendiff('file1.json', 'file1.json', 'plain')).toEqual(secondCorrectDifWhenUsePlain);
    });
    test('Compaire yaml files when have relative paths', () => {
      expect(gendiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(firstCorrectDifWhenUsePlain);
      expect(gendiff('file1.yaml', 'file1.yaml', 'plain')).toEqual(secondCorrectDifWhenUsePlain);
    });
    test('Compaire json files when have absolute paths', () => {
      expect(gendiff(pathToFile1j, pathToFile2j, 'plain')).toEqual(firstCorrectDifWhenUsePlain);
      expect(gendiff(pathToFile1j, pathToFile1j, 'plain')).toEqual(secondCorrectDifWhenUsePlain);
    });
    test('Compaire yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y, 'plain')).toEqual(firstCorrectDifWhenUsePlain);
      expect(gendiff(pathToFile1y, pathToFile1y, 'plain')).toEqual(secondCorrectDifWhenUsePlain);
    });
  });

  describe('Additional work', () => {
    test('Compaire json with yaml files when have realative paths', () => {
      expect(gendiff('file1.json', 'file2.yaml', 'plain')).toEqual(firstCorrectDifWhenUsePlain);
    });
    test('Compaire json with yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y, 'plain')).toEqual(firstCorrectDifWhenUsePlain);
    });
  });
});

describe('When formateName = json', () => {
  beforeEach(() => {
    firstCorrectDifWhenUseJest = {
        name:'common',
        status: 'unchanged',
        childrens: [
          { name: follow, status: 'added', childrens: [false] },
          { name: setting1, status: 'unchanged', childrens: ['Value'] },
          { name: setting, status: 'removed', childrens: [200] },
          { name: setting3, status: 'updated', childrens: [true, null] },
          { name: setting4, status: 'added', childrens: ['blah blah'] },
          { name: setting5, status: 'added', childrens: [ {name: key5, status: 'uncganged', childrens: ['value5'] }] },
          { name:setting6, status: 'unchanged', childrens: [ {name: 'doge', status: 'unchanged', childrens: [
                  wow: { status: 'updated', value: { removed: '', added: 'so much' } },
                },
              },
              key: { status: 'unchanged', value: 'value' },
              ops: { status: 'added', value: 'vops' },
            },
          },
        },
      },
      group1: {
        status: 'unchanged',
        value: {
          baz: { status: 'updated', value: { removed: 'bas', added: 'bars' } },
          foo: { status: 'unchanged', value: 'bar' },
          nest: { status: 'updated', value: { removed: { key: 'value' }, added: 'str' } },
        },
      },
      group2: { status: 'deleted', value: { abc: 12345, deep: { id: 45 } } },
      group3: { status: 'added', value: { deep: { id: { number: 45 } }, fee: 100500 } },
    };

    // secondCorrectDifWhenUseJest = '';
  });

  describe('Main work', () => {
    test('Compaire json files when have relative paths', () => {
      expect(gendiff('file1.json', 'file2.json', 'jest')).toEqual(firstCorrectDifWhenUseJest);
      // expect(gendiff('file1.json', 'file1.json', 'jest')).toEqual(secondCorrectDifWhenUseJest);
    });
    test('Compaire yaml files when have relative paths', () => {
      expect(gendiff('file1.yaml', 'file2.yaml', 'jest')).toEqual(firstCorrectDifWhenUseJest);
      // expect(gendiff('file1.yaml', 'file1.yaml', 'jest')).toEqual(secondCorrectDifWhenUsePJest);
    });
    test('Compaire json files when have absolute paths', () => {
      expect(gendiff(pathToFile1j, pathToFile2j, 'jest')).toEqual(firstCorrectDifWhenUseJest);
      // expect(gendiff(pathToFile1j, pathToFile1j, 'jest')).toEqual(secondCorrectDifWhenUseJest);
    });
    test('Compaire yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y, 'jest')).toEqual(firstCorrectDifWhenUseJest);
      // expect(gendiff(pathToFile1y, pathToFile1y, 'jest')).toEqual(secondCorrectDifWhenUseJest);
    });
  });

  describe('Additional work', () => {
    test('Compaire json with yaml files when have realative paths', () => {
      expect(gendiff('file1.json', 'file2.yaml', 'jest')).toEqual(firstCorrectDifWhenUsePlain);
    });
    test('Compaire json with yaml files when have absolute paths', () => {
      expect(gendiff(pathToFile1y, pathToFile2y, 'jest')).toEqual(firstCorrectDifWhenUsePlain);
    });
  });
});
