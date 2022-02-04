import gendiff from '../src/gendiff2.js';
import stylish from '../src/stylish.js';
import parser from '../src/parser.js';

let correctDifBetFile1File2;
let correctDifBetFile1File1;
let value1j;
let value1y;
let value2j;
let value2y;
beforeEach(() => {
  correctDifBetFile1File2 = '{\n'
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

  correctDifBetFile1File1 = '{\n'
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

  value1j = parser('file1.json');
  value2j = parser('file2.json');
  value1y = parser('file1.yaml');
  value2y = parser('file2.yaml');
});

describe('usual Work', () => {
  test('compaire json files', () => {
    expect(stylish(gendiff(value1j, value2j))).toEqual(correctDifBetFile1File2);
    expect(stylish(gendiff(value1j, value1j))).toEqual(correctDifBetFile1File1);
  });
  test('compaire yaml files', () => {
    expect(stylish(gendiff(value1y, value2y))).toEqual(correctDifBetFile1File2);
    expect(stylish(gendiff(value1y, value1y))).toEqual(correctDifBetFile1File1);
  });
});

describe('Unusual Work', () => {
  test('compaire json with yaml', () => {
    expect(stylish(gendiff(value1j, value2y))).toEqual(correctDifBetFile1File2);
    expect(stylish(gendiff(value1j, value1y))).toEqual(correctDifBetFile1File1);
  });
});
