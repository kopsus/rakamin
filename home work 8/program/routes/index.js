const express = require("express")
const router = express.Router()
const filmRouter = require("./film.js")
const categoryRouter = require("./category.js")
const actorRouter = require("./actor.js")

router.use("/film", filmRouter)
router.use("/category", categoryRouter)
router.use("/actor", actorRouter)

module.exports = router
