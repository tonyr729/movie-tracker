import { addMovies } from './actions';

describe('Actions', () => {
  describe('addMovies', () => {
    it('has a type of ADD_MOVIES', () => {
      let mockMovieData = {movie: 'Fake Film'};

      let actual = addMovies(mockMovieData);

      expect(actual.type).toEqual('ADD_MOVIES');
    });

    it('should add movie data to the addMovie action', () => {
      let mockMovieData = {movie: 'Fake Film'};

      let actual = addMovies(mockMovieData);

      expect(actual.movieData).toEqual(mockMovieData);
    });
  });
});