import _ from 'lodash';
import { getChildrensOfNodeAsArray } from '../src/diff.js';

const json = (diffAsTree) => {
  const childrensOfdiff = getChildrensOfNodeAsArray(diffAsTree);
  const result = childrensOfdiff.map((item) => _.cloneDeep(item));

  return {
    name: 'this is diff',
    childrens: result,
  };
};
export default json;
