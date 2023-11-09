const pool = require("../config/database")

class Users {
  constructor(id, email, gender, password, role) {
    this.id = +id
    this.email = email
    this.gender = gender
    this.password = password
    this.role = role
  }

  static showAllUsers(callback) {
    let query = `SELECT * FROM users;`

    pool.query(query, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static showUsersById(id, callback) {
    let query = `SELECT * FROM users where id = $1;`

    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static delete(id, callback) {
    let query = `delete from users where id=$1`

    pool.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  }

  static post(user, callback) {
    let query = `
                INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4);
            `

    let arrData = [user.email, user.gender, user.password, user.role]

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        console.log(`${user.email} sudah masuk datanya..`)
        callback(null, null)
      }
    })
  }

  static edit(id, user, callback) {
    let query = `
            UPDATE "users" SET "email" = $1, "gender" = $2, "password" = $3, "role" = $4 WHERE id = $5;
            `

    let arrData = [user.email, user.gender, user.password, user.role, id]

    console.log(arrData)

    pool.query(query, arrData, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        console.log(`sudah di update datanya..`)
        callback(null, null)
      }
    })
  }
}

module.exports = Users
