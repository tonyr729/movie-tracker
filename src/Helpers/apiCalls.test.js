import { fetchMovieData } from './apiCalls';
import {apikey} from './../apikey';
import DataCleaner from './DataCleaner';

jest.mock('./DataCleaner', () => {
  return jest.fn().mockImplementation(() => {
    return {
      cleanMovies: jest.fn().mockImplementation(() => Promise.resolve([{data1: "data"}, {data2: "data2"}]))
    };
  });
});

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