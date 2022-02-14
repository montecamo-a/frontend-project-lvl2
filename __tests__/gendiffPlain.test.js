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

const firstCorrectDiff = "Property 'common.follow' was added with value: false\n"
                       + "Property 'common.setting2' was removed\n"
                       + "Property 'common.setting3' was updated. From true to null\n"
                       + "Property 'common.setting4' was added with value: 'blah blah'\n"
                       + "Property 'common.setting5' was added with value: [complex value]\n"
                       + "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n"
                       + "Property 'common.setting6.ops' was added with value: 'vops'\n"
                       + "Property 'group1.baz' was updated. From 'bas' to 'bars'\n"
                       + "Property 'group1.nest' was updated. From [complex value] to 'str'\n"
                       + "Property 'group2' was removed\n"
                       + "Property 'group3' was added with value: [complex value]";

const secondCorrectDiff = '';

const thirdCorrectDiff = "Property 'common' was removed\n"
                       + "Property 'group1' was removed\n"
                       + "Property 'group2' was removed";

describe('Main work', () => {
  test('Compaire json files when have relative paths', () => {
    expect(gendiff('file1.json', 'file2.json', 'plain')).toBe(firstCorrectDiff);
    expect(gendiff('file1.json', 'file1.json', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file3.json', 'file3.json', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file1.json', 'file3.json', 'plain')).toBe(thirdCorrectDiff);
  });
  test('Compaire yaml files when have relative paths', () => {
    expect(gendiff('file1.yaml', 'file2.yaml', 'plain')).toBe(firstCorrectDiff);
    expect(gendiff('file1.yaml', 'file1.yaml', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file3.yaml', 'file3.yaml', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file1.yaml', 'file3.yaml', 'plain')).toBe(thirdCorrectDiff);
  });
  test('Compaire json files when have absolute paths', () => {
    expect(gendiff(pathToFile1j, pathToFile2j, 'plain')).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile1j, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile3j, pathToFile3j, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1j, pathToFile3j, 'plain')).toBe(thirdCorrectDiff);
  });
  test('Compaire yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y, 'plain')).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile1y, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile3y, pathToFile3y, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile3y, 'plain')).toBe(thirdCorrectDiff);
  });
});

describe('Additional work', () => {
  test('Compaire json with yaml files when have realative paths', () => {
    expect(gendiff('file1.json', 'file2.yaml', 'plain')).toBe(firstCorrectDiff);
    expect(gendiff('file1.json', 'file1.yaml', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file3.json', 'file3.yaml', 'plain')).toBe(secondCorrectDiff);
    expect(gendiff('file1.json', 'file3.yaml', 'plain')).toBe(thirdCorrectDiff);
  });
  test('Compaire json with yaml files when have absolute paths', () => {
    expect(gendiff(pathToFile1y, pathToFile2y, 'plain')).toBe(firstCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile1y, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile3y, pathToFile3y, 'plain')).toBe(secondCorrectDiff);
    expect(gendiff(pathToFile1y, pathToFile3y, 'plain')).toBe(thirdCorrectDiff);
  });
});
