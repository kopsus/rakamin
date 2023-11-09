const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/movieController")
const multer = require("../utils/multer")

router.get("/", moviesController.showAllMovies)
router.get("/:id", moviesController.showMoviesById)
router.delete("/:id", moviesController.delete)
router.post("/upload", multer().single("photo"), moviesController.addPhoto)

module.exports = router
