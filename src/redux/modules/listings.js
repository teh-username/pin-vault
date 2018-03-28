import { combineReducers } from 'redux';

export const ADD_ENTRY = 'modules/listings/ADD_ENTRY';
export const MODIFY_ENTRY = 'modules/listings/MODIFY_ENTRY';
export const DELETE_ENTRY = 'modules/listings/DELETE_ENTRY';

/*
  Sample state:
  {
    entries: {
      2cf05d: {
        name: 'Bank 1',
        code: '1234',
      },
      5d94db: {
        name: 'Bank 2',
        code: '5678',
      },
    },
  }
*/

const initialState = {
  entries: {},
};

export const entries = (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        [action.id]: {
          code: action.code,
          name: action.name,
        },
      };
    case MODIFY_ENTRY:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          code: action.code,
        },
      };
    case DELETE_ENTRY:
      return Object.entries(state)
        .filter(([id, entryDetails]) => action.id !== id)
        .reduce((previousState, [id, entryDetails]) => {
          return {
            ...previousState,
            [id]: entryDetails,
          };
        }, {});
    default:
      return state;
  }
};

export default combineReducers({
  entries,
});

export const addEntry = (id, name, code) => ({
  type: ADD_ENTRY,
  id,
  name,
  code,
});

export const modifyEntry = (id, code) => ({
  type: MODIFY_ENTRY,
  id,
  code,
});

export const deleteEntry = id => ({
  type: DELETE_ENTRY,
  id,
});

export const getEntries = ({ listings: { entries } }) =>
  Object.entries(entries);
export const getEntryDetails = ({ listings: { entries } }, id) => entries[id];
