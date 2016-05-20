const initialState = [
  {
    id: 0, comparable: true, text: `Some

Simple
Text
File`
  },
  {
    id: 1, comparable: true, text: `Another

Text
File
With
Additional
Line`
  }
];

const file = (state, action, previousValue) => {
  switch (action.type) {
    case 'ADD_FILE':
      return {
        id: action.id,
        text: action.text
      };
    case 'CHANGE_FILE':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        text: action.text
      });
    case 'TOGGLE_FILE_COMPARABLE':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        comparable: !state.comparable
      });
    case 'REMOVE_FILE':
      if (state.id !== action.id) {
        previousValue.push(state);
      }
      return previousValue;
    default:
      return state;
  }
};

const files = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return [
        ...state,
        file(undefined, action)
      ];
    case 'CHANGE_FILE':
    case 'TOGGLE_FILE_COMPARABLE':
      return state.map(f =>
        file(f, action)
      );
    case 'REMOVE_FILE':
      return state.reduce((previousValue, currentValue) =>
          file(currentValue, action, previousValue)
        , []);
    default:
      return state;
  }
};

export default files;
