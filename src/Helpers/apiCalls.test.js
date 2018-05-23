import { fetchMovieData, signIn, signUp, postMovieToFavorites, retrieveFavorites, deleteFavorite } from './apiCalls';
import {apikey} from './../apikey';

jest.mock('./DataCleaner', () => {
  return jest.fn().mockImplementation(() => {
    return {
      cleanMovies: jest.fn().mockImplementation(() => Promise.resolve([{data1: "data"}, {data2: "data2"}]))
    };
  });
});

describe('api tests', () => {

  describe('Fetch Movie Data', () => {
    let response;

    beforeEach(() => {
      response = [{data1: "data"}, {data2: "data2"}];
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(response)
      }));
    });
  
    it('should call fetch with the correct params', async () => {
      let expected = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
  
      await fetchMovieData();
  
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });
  
    it('should return an array of objects if the promise is resolved', async () => {
  
      await expect(fetchMovieData()).resolves.toEqual(response);
    });
  
    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(fetchMovieData()).rejects.toEqual(expected);
    });
  });
 
  describe('Sign in', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = {
        "password": "password",
        "email": "tman2272@aol.com"
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUser),
        ok: true
      }));
    });

    it('should call signIn with the correct params', async () => {
      let expected = ['/api/users',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: mockUser.email,
            password: mockUser.password
          })
        }
      ];
      await signIn('tman2272@aol.com', 'password');
  
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return an object if the promise is resolved', async () => {
  
      await expect(signIn('tman2272@aol.com', 'password')).resolves.toEqual(mockUser);
    });

    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(signIn()).rejects.toEqual(expected);
    });
  });

  describe('sign up', () => {
    let mockSignup;

    beforeEach(() => {
      mockSignup = {
        "name": 'Tyler',
        "password": "password",
        "email": "tman2272@aol.com",
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockSignup),
        ok: true
      }));
    });

    it('should call signUp with the correct params', async () => {
      let expected = ['/api/users/new',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            name: mockSignup.name,
            email: mockSignup.email,
            password: mockSignup.password
          })
        }
      ];
      await signUp('Tyler', 'tman2272@aol.com', 'password');
  
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return an object if the promise is resolved', async () => {
  
      await expect(signUp('Tyler', 'tman2272@aol.com', 'password')).resolves.toEqual(mockSignup);
    });

    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(signUp()).rejects.toEqual(expected);
    });
  });

  describe('post movie to favorites', () => {
    let mockFavorites;
    beforeEach(() => {
      mockFavorites = [
        {favoriteId: 383498},
        {favoriteId: 383497}
      ];
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFavorites),
        ok: true
      }));
    });

    it('should call postMovieToFavorites with the correct params', async () => {
      let expected = ['/api/users/favorites/new',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            movie_id: 333339
          })
        }
      ];
      await postMovieToFavorites({movie_id: 333339}, []);
  
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(postMovieToFavorites({movie_id: 333339}, [])).rejects.toEqual(expected);
    });
  });

  describe('retrieve favorites', () => {
    let mockFavorites;
    let mockUserId;

    beforeEach(() => {
      mockFavorites = [
        {favoriteId: 383498},
        {favoriteId: 383497}
      ];
      mockUserId = 7;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFavorites)
      }));
    });
    
    it('should call retrieveFavorites with the correct params', async () => {
      let expected = '/api/users/7/favorites';
      await retrieveFavorites(mockUserId);
  
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(retrieveFavorites(7)).rejects.toEqual(expected);
    });
  });

  describe('delete favorite', () => {
    let mockMovieId;
    let mockUserId;

    beforeEach(() => {
      mockMovieId = 383498;
      mockUserId = 7;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUserId)
      }));
    });

    it('should call deleteFavorite with the correct params', async () => {
      let expected = ['/api/users/7/favorites/383498', {
        method: 'DELETE'
      }
      ];
      await deleteFavorite(mockUserId, mockMovieId);
  
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should throw an error if the promise rejects', async () => {
      let expected = new Error('Failed to fetch');
  
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(expected));
  
      await expect(deleteFavorite()).rejects.toEqual(expected);
    });
  });
});