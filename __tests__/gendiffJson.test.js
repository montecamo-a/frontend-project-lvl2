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

const firstCorrectDiff = {
  name: 'this is diff',
  childrens: [
    {
      name: 'common',
      status: 'unchanged',
      childrens: [
        {
          name: 'follow',
          status: 'added',
          childrens: [false],
        },
        {
          name: 'setting1',
          status: 'unchanged',
          childrens: ['Value 1'],
        },
        {
          name: 'setting2',
          status: 'removed',
          childrens: [200],
        },
        {
          name: 'setting3',
          status: 'updated',
          childrens: [true, null],
        },
        {
          name: 'setting4',
          status: 'added',
          childrens: ['blah blah'],
        },
        {
          name: 'setting5',
          status: 'added',
          childrens: [
            {
              name: 'key5',
              status: 'unchanged',
              childrens: ['value5'],
            },
          ],
        },
        {
          name: 'setting6',
          status: 'unchanged',
          childrens: [
            {
              name: 'doge',
              status: 'unchanged',
              childrens: [
                {
                  name: 'wow',
                  status: 'updated',
                  childrens: ['', 'so much'],
                },
              ],
            },
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
            {
              name: 'ops',
              status: 'added',
              childrens: ['vops'],
            },
          ],
        },
      ],
    },
    {
      name: 'group1',
      status: 'unchanged',
      childrens: [
        {
          name: 'baz',
          status: 'updated',
          childrens: ['bas', 'bars'],
        },
        {
          name: 'foo',
          status: 'unchanged',
          childrens: ['bar'],
        },
        {
          name: 'nest',
          status: 'updated',
          childrens: [
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
            'str',
          ],
        },
      ],
    },
    {
      name: 'group2',
      status: 'removed',
      childrens: [
        {
          name: 'abc',
          status: 'unchanged',
          childrens: [12345],
        },
        {
          name: 'deep',
          status: 'unchanged',
          childrens: [
            {
              name: 'id',
              status: 'unchanged',
              childrens: [45],
            },
          ],
        },
      ],
    },
    {
      name: 'group3',
      status: 'added',
      childrens: [
        {
          name: 'deep',
          status: 'unchanged',
          childrens: [
            {
              name: 'id',
              status: 'unchanged',
              childrens: [
                {
                  name: 'number',
                  status: 'unchanged',
                  childrens: [45],
                },
              ],
            },
          ],
        },
        {
          name: 'fee',
          status: 'unchanged',
          childrens: [100500],
        },
      ],
    },
  ],
};

const secondCorrectDiff = {
  name: 'this is diff',
  childrens: [
    {
      name: 'common',
      status: 'unchanged',
      childrens: [
        {
          name: 'setting1',
          status: 'unchanged',
          childrens: ['Value 1'],
        },
        {
          name: 'setting2',
          status: 'unchanged',
          childrens: [200],
        },
        {
          name: 'setting3',
          status: 'unchanged',
          childrens: [true],
        },
        {
          name: 'setting6',
          status: 'unchanged',
          childrens: [
            {
              name: 'doge',
              status: 'unchanged',
              childrens: [
                {
                  name: 'wow',
                  status: 'unchanged',
                  childrens: [''],
                },
              ],
            },
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
          ],
        },
      ],
    },
    {
      name: 'group1',
      status: 'unchanged',
      childrens: [
        {
          name: 'baz',
          status: 'unchanged',
          childrens: ['bas'],
        },
        {
          name: 'foo',
          status: 'unchanged',
          childrens: ['bar'],
        },
        {
          name: 'nest',
          status: 'unchanged',
          childrens: [
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
          ],
        },
      ],
    },
    {
      name: 'group2',
      status: 'unchanged',
      childrens: [
        {
          name: 'abc',
          status: 'unchanged',
          childrens: [12345],
        },
        {
          name: 'deep',
          status: 'unchanged',
          childrens: [
            {
              name: 'id',
              status: 'unchanged',
              childrens: [45],
            },
          ],
        },
      ],
    },
  ],
};

const thirdCorrectDiff = {
  name: 'this is diff',
  childrens: [
    {
      name: 'common',
      status: 'removed',
      childrens: [
        {
          name: 'setting1',
          status: 'unchanged',
          childrens: ['Value 1'],
        },
        {
          name: 'setting2',
          status: 'unchanged',
          childrens: [200],
        },
        {
          name: 'setting3',
          status: 'unchanged',
          childrens: [true],
        },
        {
          name: 'setting6',
          status: 'unchanged',
          childrens: [
            {
              name: 'doge',
              status: 'unchanged',
              childrens: [
                {
                  name: 'wow',
                  status: 'unchanged',
                  childrens: [''],
                },
              ],
            },
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
          ],
        },
      ],
    },
    {
      name: 'group1',
      status: 'removed',
      childrens: [
        {
          name: 'baz',
          status: 'unchanged',
          childrens: ['bas'],
        },
        {
          name: 'foo',
          status: 'unchanged',
          childrens: ['bar'],
        },
        {
          name: 'nest',
          status: 'unchanged',
          childrens: [
            {
              name: 'key',
              status: 'unchanged',
              childrens: ['value'],
            },
          ],
        },
      ],
    },
    {
      name: 'group2',
      status: 'removed',
      childrens: [
        {
          name: 'abc',
          status: 'unchanged',
          childrens: [12345],
        },
        {
          name: 'deep',
          status: 'unchanged',
          childrens: [
            {
              name: 'id',
              status: 'unchanged',
              childrens: [45],
            },
          ],
        },
      ],
    },
  ],
};

const fourthCorrectDiff = {
  name: 'this is diff',
  childrens: [],
};

describe('Main work', () => {
  test('Compaire json files when have relative paths', () => {
    expect(gendiff('file1.json', 'file2.json', 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff('file1.json', 'file1.json', 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff('file1.json', 'file3.json', 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff('file3.json', 'file3.json', 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
  test('Compaire yaml files when have relative paths', () => {
    expect(gendiff('file1.yaml', 'file2.yaml', 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff('file1.yaml', 'file1.yaml', 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff('file1.yaml', 'file3.yaml', 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff('file3.yaml', 'file3.yaml', 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
  test('Compaire json files when have absolute paths', () => {
    expect(gendiff(pathToFile1j, pathToFile2j, 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff(pathToFile1j, pathToFile1j, 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff(pathToFile1j, pathToFile3j, 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff(pathToFile3j, pathToFile3j, 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
  test('Compaire yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y, 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff(pathToFile1y, pathToFile1y, 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff(pathToFile1y, pathToFile3y, 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff(pathToFile3y, pathToFile3y, 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
});

describe('Additional work', () => {
  test('Compaire json with yaml files when have realative paths', () => {
    expect(gendiff('file1.json', 'file2.yaml', 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff('file1.json', 'file1.yaml', 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff('file1.json', 'file3.yaml', 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff('file3.json', 'file3.yaml', 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
  test('Compaire json with yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1j, pathToFile2y, 'json')).toEqual(JSON.stringify(firstCorrectDiff));
    expect(gendiff(pathToFile1j, pathToFile1y, 'json')).toEqual(JSON.stringify(secondCorrectDiff));
    expect(gendiff(pathToFile1j, pathToFile3y, 'json')).toEqual(JSON.stringify(thirdCorrectDiff));
    expect(gendiff(pathToFile3j, pathToFile3y, 'json')).toEqual(JSON.stringify(fourthCorrectDiff));
  });
});
