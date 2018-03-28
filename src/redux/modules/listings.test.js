import {
  entries as entriesReducer,
  addEntry,
  modifyEntry,
  deleteEntry,
} from './listings';

describe('listings modules test', () => {
  describe('entries reducer test', () => {
    it('should return the initial state', () => {
      expect(entriesReducer(undefined, {})).toEqual({});
    });

    it('should add an entry correctly', () => {
      expect(
        entriesReducer(
          {
            init: {
              code: '1234',
              name: 'revan',
            },
          },
          addEntry('id', 'malak', '1412')
        )
      ).toEqual({
        init: {
          code: '1234',
          name: 'revan',
        },
        id: {
          code: '1412',
          name: 'malak',
        },
      });
    });

    it('should modify (the code) an entry correctly', () => {
      expect(
        entriesReducer(
          {
            init: {
              code: '1234',
              name: 'revan',
            },
            id: {
              code: '1412',
              name: 'malak',
            },
          },
          modifyEntry('init', '9999')
        )
      ).toEqual({
        init: {
          code: '9999',
          name: 'revan',
        },
        id: {
          code: '1412',
          name: 'malak',
        },
      });
    });

    it('should delete an entry correctly', () => {
      expect(
        entriesReducer(
          {
            init: {
              code: '1234',
              name: 'revan',
            },
            id: {
              code: '1412',
              name: 'malak',
            },
          },
          deleteEntry('init')
        )
      ).toEqual({
        id: {
          code: '1412',
          name: 'malak',
        },
      });
    });
  });
});
