import DataCleaner from './DataCleaner'

describe('Fetch Movie Data', () => {
  let cleaner;

  beforeEach(() => {
    cleaner = new DataCleaner();
  });
  
  describe('Clean Movies', () => {
    it('should return the desired clean data', async () => {
      const dirtyData = [
        {
          id: 4,
          original_title: 'Avengers',
          poster_path: '#',
          release_date: 20180101,
          vote_average: 9,
          extra: 'garbage',
          overview: 'Blah blah blah'
        },
        {
          id: 5,
          original_title: 'Deadpool',
          poster_path: '#',
          release_date: 20180102,
          vote_average: 9,
          extra: 'garbage',
          overview: 'Blah blah blah'
        }
      ];
      const dirtyUser = {id: 1, extra: 'garbage'};
      const expected = [
        {
          movie_id: 4,
          user_id: 1,
          title: 'Avengers',
          poster_path: '#',
          release_date: 20180101,
          vote_average: 9,
          overview: 'Blah blah blah'
        },
        {
          movie_id: 5,
          user_id: 1,
          title: 'Deadpool',
          poster_path: '#',
          release_date: 20180102,
          vote_average: 9,
          overview: 'Blah blah blah'
        }
      ]

      const cleanData = cleaner.cleanMovies(dirtyData, dirtyUser);

      expect(cleanData).toEqual(expected);
    });
  });
  
  describe('Clean Favorites', () => {
    it('should return the desired clean data', async () => {
      const dirtyData = [
        {
          movie_id: 4,
          extra: 'BS'
        },
        {
          movie_id: 5,
          extra: 'BS'
        }
      ];
      const expected = [
        {
          favoriteId: 4
        },
        {
          favoriteId: 5
        }
      ]

      const cleanData = cleaner.cleanFavorites(dirtyData);
      
      expect(cleanData).toEqual(expected);
    });
  });
});