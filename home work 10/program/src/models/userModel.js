const UsersRepository = require("../repository/userRepository")

class UsersModel {
  static showAllUsers() {
    return new Promise((resolve, reject) => {
      UsersRepository.showAllUsers((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static showUsersById(id) {
    return new Promise((resolve, reject) => {
      UsersRepository.showUsersById(id, (err, result) => {
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
      UsersRepository.delete(id, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static post(userData) {
    return new Promise((resolve, reject) => {
      UsersRepository.post(userData, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  static edit(id, userData) {
    return new Promise((resolve, reject) => {
      UsersRepository.edit(id, userData, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = UsersModel
