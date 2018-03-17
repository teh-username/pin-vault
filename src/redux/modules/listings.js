import { combineReducers } from 'redux';

const ADD_ENTRY = 'modules/listings/ADD_ENTRY';

/*
  Sample state:
  {
    entries: [
      {
        id: '2cf05d',
        name: 'bank_1',
      },
      {
        id: '5d94db',
        name: 'bank_2',
      },
    ],
    entryDetails: {
      2cf05d: {
        code: '1234',
      },
      5d94db: {
        code: '5678',
      },
    },
  }
*/

const initialState = {
  entries: [
    {
      id: '2cf05d',
      name: 'bank_1',
    },
  ],
  entryDetails: {
    '2cf05d': {
      code: '412712',
    },
  },
};

const entries = (state = initialState.entries, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },
      ];
    default:
      return state;
  }
};

const entryDetails = (state = initialState.entryDetails, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        [action.id]: {
          code: action.code,
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  entries,
  entryDetails,
});

export const addEntry = (id, name, code) => ({
  type: ADD_ENTRY,
  id,
  name,
  code,
});

export const getEntries = ({ listings: { entries } }) => entries;
export const getEntryDetails = ({ listings: { entryDetails } }, entryName) =>
  entryDetails[entryName];
