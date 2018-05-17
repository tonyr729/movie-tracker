import { apikey } from '../apikey'
import DataCleaner from './DataCleaner'

export const fetchMovieData = async () => {
  try {
    const dataCleaner = new DataCleaner();
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`
    const response = await fetch(url);
    const data = await response.json();
    const cleanData = await dataCleaner.cleanMovies(data.results);
    
    return cleanData;
  } catch (error) {
    throw new Error('Failed to fetch');
  }
};

// export const signIn = async (email,password) => {
//   const url= 'http://localhost:3000/api/users';
//   const response = await fetch(url,{
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: {
//       email,
//       password
//     }
//   })
//   debugger
//   const user = await response.json();

// }