import { getTexts } from '../utils';

let nextFileId = 2;

const changeFile = (id, text) => {
  return {
    type: 'CHANGE_FILE',
    id,
    text
  };
};

export const updateDiff = (first, second) => {
  return {
    type: 'UPDATE_DIFF',
    first,
    second
  };
};

export const toggleComparableFile = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_FILE_COMPARABLE',
      id
    });
    dispatch(updateDiff(...getTexts(getState())));
  };
};

export const addFile = () => {
  return {
    type: 'ADD_FILE',
    id: nextFileId++
  };
};

export const removeFile = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FILE',
      id
    });
    dispatch(updateDiff(...getTexts(getState())));
  };
};

export const handleChange = (id, text) => {
  return (dispatch, getState) => {
    dispatch(changeFile(id, text));
    dispatch(updateDiff(...getTexts(getState())));
  };
};

