import { combineReducers } from 'redux';

const ADD_ENTRY = 'modules/listings/ADD_ENTRY';

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
  entries: {
    '2cf05d': {
      name: 'Bank 1',
      code: '412712',
    },
  },
};

const entries = (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        [action.id]: {
          code: action.code,
          name: action.name,
        },
      };
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

export const getEntries = ({ listings: { entries } }) =>
  Object.entries(entries);
export const getEntryDetails = ({ listings: { entries } }, id) => entries[id];
