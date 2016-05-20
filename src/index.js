import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Diff from './components/Diff';
import diff from './reducers';
import { addFile, removeFile, handleChange, toggleComparableFile, updateDiff } from './actions';
import { getTexts } from './utils';

const store = createStore(diff, applyMiddleware(thunkMiddleware));
const rootEl = document.getElementById('root');

function render() {
  const { files, diffFiles } = store.getState();
  ReactDOM.render(
    <Diff
      files={files}
      diffFiles={diffFiles}
      onAdd={() => store.dispatch(addFile())}
      onToggleComparable={(id) => store.dispatch(toggleComparableFile(id))}
      onRemove={(id) => store.dispatch(removeFile(id))}
      onChange={(id, text) => store.dispatch(handleChange(id, text))}
    />,
    rootEl
  );
}

render();
store.subscribe(render);
store.dispatch(updateDiff(...getTexts(store.getState())));
