const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.get("/", usersController.showAllUsers)
router.get("/:id", usersController.showUsersById)
router.delete("/:id", usersController.delete)
router.post("/", usersController.post)
router.put("/:id", usersController.edit)

module.exports = router
