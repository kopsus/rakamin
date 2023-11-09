const router = require("express").Router()
const todoRouter = require("./todoRouter")

router.use("/", todoRouter)

module.exports = router
