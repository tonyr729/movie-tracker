class DataCleaner {

  cleanMovies = (data) => {
    const cleanData = data.map(movie => ({
      title: movie.original_title,
      image: movie.poster_path
    }))

    return cleanData;
  }

}

export default DataCleaner;