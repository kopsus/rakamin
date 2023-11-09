const MoviesRepository = require("../repository/movieRepository")

class MoviesModel {
  static showAllMovies() {
    return new Promise((resolve, reject) => {
      MoviesRepository.showAllMovies((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static showMoviesById(id) {
    return new Promise((resolve, reject) => {
      MoviesRepository.showMovieById(id, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      MoviesRepository.delete(id, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static post(movieData) {
    return new Promise((resolve, reject) => {
      MoviesRepository.post(movieData, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static addPhoto(movieData) {
    return new Promise((resolve, reject) => {
      MoviesRepository.addPhoto(movieData, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static edit(id, movieData) {
    return new Promise((resolve, reject) => {
      MoviesRepository.edit(id, movieData, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = MoviesModel
