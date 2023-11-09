const pool = require("../config/database")

class Movies {
  constructor(id, title, genres, year, photo) {
    this.id = +id
    this.title = title
    this.genres = genres
    this.year = year
    this.photo = photo
  }

  static showAllMovies(callback) {
    const query = `SELECT * FROM movies;`

    pool.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static showMovieById(id, callback) {
    const query = `SELECT * FROM movies where id = $1;`

    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static movieDelete(id, callback) {
    const query = `delete from movies where id = $1`

    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static addMovie(movie, callback) {
    const query = `
                INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);
            `

    let arrData = [movie.title, movie.genres, movie.year]

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, null)
      }
    })
  }

  static addPhoto(movie, callback) {
    const query = `INSERT INTO movies ("photo") VALUES ($1)`

    let arrData = [movie.photo]

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, null)
      }
    })
  }

  static editMovie(id, movie, callback) {
    const query = `
            UPDATE "movies" SET "title" = $1, "genres" = $2, "year" = $3,  WHERE id = $5;
            `

    let arrData = [movie.title, movie.genres, movie.year, id]

    console.log(arrData)

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        // console.log(`sudah di update datanya..`)
        callback(null, null)
      }
    })
  }
}

module.exports = Movies
