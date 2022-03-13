import { uniq } from "lodash-es";

const print = (key, value) => `${key}: ${value}`;

export default (json1, json2) => {
  const diffs = uniq([...Object.keys(json1), ...Object.keys(json2)])
    .sort()
    .flatMap((key) => {
      if (json1[key] === json2[key]) {
        return `  ${key}: ${json1[key]}`;
      }

      if (key in json1 && key in json2) {
        return [`- ${key}: ${json1[key]}`, `+ ${key}: ${json2[key]}`];
      }

      if (key in json1) {
        return `- ${key}: ${json1[key]}`;
      }

      return `+ ${key}: ${json2[key]}`;
    });

  return `
{
  ${diffs.join("\n  ")}
}
  `;
};
