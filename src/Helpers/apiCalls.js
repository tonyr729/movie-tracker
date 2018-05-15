import { apikey } from '../apikey'
import DataCleaner from './DataCleaner'

export const fetchMovieData = async () => {
  const dataCleaner = new DataCleaner();
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
  const response = await fetch(url);
  const data = await response.json();
  const cleanData = await dataCleaner.cleanMovies(data.results);
  
  return cleanData;
}