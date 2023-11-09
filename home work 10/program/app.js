const express = require("express")

const app = express()
const routes = require("./src/routers/index")
const path = require("path")
const port = 3000
const uploadRouter = require("./src/utils/multer")

app.use(express.json())

app.use(routes)

app.use(
  "/upload",
  uploadRouter,
  express.static(path.join(__dirname, "./src/upload"))
)

app.listen(port, () => {
  console.log(`Server run at port ${port} `)
})
