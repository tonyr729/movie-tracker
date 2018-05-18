import { addMovies, addFavorites, login, logout } from './actions';

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
  describe('addFavorites', () => {
    it('has a type of ADD_FAVORITE', () => {
      let mockMovieData = {movie: 'Fake Film'};

      let actual = addFavorites(mockMovieData);

      expect(actual.type).toEqual('ADD_FAVORITE');
    });

    it('should add movie data to the favorites', () => {
      let mockMovieData = {movie: 'Fake Film'};

      let actual = addFavorites(mockMovieData);

      expect(actual.movie).toEqual(mockMovieData);
    });
  });
  describe('login', () => {
    it('has a type of LOGIN', () => {
      let mockUser = {name: 'Steph'};

      let actual = login(mockUser);

      expect(actual.type).toEqual('LOGIN');
    });

    it('should add user', () => {
      let mockUser = {name: 'Steph'};

      let actual = login(mockUser);

      expect(actual.user).toEqual(mockUser);
    });
  });
  describe('logout', () => {
    it('has a type of LOGOUT', () => {
      let actual = logout();

      expect(actual.type).toEqual('LOGOUT');
    });
  });
});