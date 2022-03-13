import diff from './diff';

const result = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`;

const fixture = (name) => `__fixtures__/${name}`;

it('should diff two json', () => {
  expect(diff(fixture('file1.json'), fixture('file2.json'))).toEqual(result);
});

it('should diff two yaml', () => {
  expect(diff(fixture('file1.yml'), fixture('file2.yml'))).toEqual(result);
});
