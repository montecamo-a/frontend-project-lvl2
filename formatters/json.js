import _ from 'lodash';

const json = (diffAsTree) => JSON.stringify(_.cloneDeep(diffAsTree));
export default json;
