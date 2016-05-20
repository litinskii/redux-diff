import { combineReducers } from 'redux';
import files from './files';
import diffFiles from './diff-files';

const DiffApp = combineReducers({
  files,
  diffFiles
});

export default DiffApp;
