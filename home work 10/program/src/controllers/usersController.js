const Users = require("../models/userModel")

class Controller {
  static showAllUsers(req, res) {
    Users.showAllUsers()
      .then((result) => {
        res.status(200).json(result.rows)
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  }

  static showUsersById(req, res) {
    Users.showUsersById(req.params.id)
      .then((result) => {
        res.status(200).json(result.rows)
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  }

  static delete(req, res) {
    Users.delete(req.params.id)
      .then(() => {
        res.send("Data user berhasil di delete")
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  }

  static post(req, res) {
    const { email, gender, password, role } = req.body

    const dataUser = {
      email,
      gender,
      password,
      role,
    }

    Users.post(dataUser)
      .then(() => {
        res.send("Data user berhasil diinput")
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  }

  static edit(req, res) {
    const { email, gender, password, role } = req.body

    const dataUser = {
      email,
      gender,
      password,
      role,
    }

    Users.edit(req.params.id, dataUser)
      .then(() => {
        res.send("Data user berhasil di update")
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  }
}

module.exports = Controller
