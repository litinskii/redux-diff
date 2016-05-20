import { getDiffs } from '../utils';

const diffFiles = (state = [], { type, first, second }) => {
  switch (type) {
    case 'UPDATE_DIFF':
      if (first && second) {
        return getDiffs(first, second);
      }
      return [];
    default:
      return state;
  }
};

export default diffFiles;

