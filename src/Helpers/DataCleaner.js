class DataCleaner {

  cleanMovies = (data) => {
    const cleanData = data.map(movie => ({
      title: movie.original_title,
      image: movie.poster_path,
      id: movie.id,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      overview: movie.overview
    }))

    return cleanData;
  }

}

export default DataCleaner;