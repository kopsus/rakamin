const express = require("express")
const router = express.Router()
const moviesRoutes = require("./movies.js")
const usersRoutes = require("./users.js")

router.use("/movies", moviesRoutes)
router.use("/users", usersRoutes)

module.exports = router
