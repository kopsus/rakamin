const express = require("express")
// const router = express.Router()

const multer = require("multer")
const path = require("path")

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directoryName = __dirname.replace("utils", "")
    cb(null, path.join(directoryName, "../upload"))
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname))
  },
})

module.exports = () => multer({ storage: diskStorage })
