class DataCleaner {

  cleanMovies = (data, user) => {
    const cleanData = data.map(movie => ({
      movie_id: movie.id,
      user_id: user.id,
      title: movie.original_title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview
    }))

    return cleanData;
  }

}

export default DataCleaner;