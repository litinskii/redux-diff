import { getSideBySideDiffsArray } from 'jsdifflib';
import _ from 'lodash';

const getTexts = (state) => {
  return _.chain(state.files).filter({ comparable: true }).map('text').value();
};

const getDiffs = (first, second) => {
  return _.reduce(getSideBySideDiffsArray(first, second), (memo, [old, { text, action }]) => {
    const oldText = old.text;
    const oldAction = old.action;
    if (_.isEqualWith(oldAction, action, 'equal') && !oldText && !text) return memo;
    switch (action) {
      case 'replace':
        memo.push({
          action: '*',
          text: (oldText ? `${oldText} | ${text}` : text)
        });
        break;
      case 'empty' :
        memo.push({
          action: '-',
          text: oldText
        });
        break;
      case 'equal':
        memo.push({ text });
        break;
      case 'insert':
        memo.push({
          action: '+',
          text
        });
        break;
      default:
        return memo;
    }
    return memo;
  }, []);
};

export {
  getDiffs,
  getTexts
};
