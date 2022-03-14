import diff from './diff';
import getFormatter from './formatters/index';

const stylishExpected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plainExpected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const fixture = (name) => `__fixtures__/${name}`;

it('should diff two json with stylish formatter', () => {
  const result = getFormatter('stylish')(
    diff(fixture('file1.json'), fixture('file2.json'))
  );

  expect(result).toEqual(stylishExpected);
});
it('should diff two json with plain formatter', () => {
  const result = getFormatter('plain')(
    diff(fixture('file1.json'), fixture('file2.json'))
  );

  expect(result).toEqual(plainExpected);
});

it.skip('should diff two yaml', () => {
  expect(diff(fixture('file1.yml'), fixture('file2.yml'))).toEqual(result);
});
