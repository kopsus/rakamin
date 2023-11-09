const express = require("express")
const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const morgan = require("morgan")
const movies = require("./src/routers/movies")
const users = require("./src/routers/users")
const pool = require("./src/config/db")

pool.connect((error, response) => {
  if (error) {
    console.error("Error connecting to the database:", error)
  } else {
    console.log("Connected to the database")
  }
})

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("tiny"))

app.use("/movies", movies)
app.use("/users", users)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "movies and user",
      version: "0.1.0",
      description: "data dari movies dan users",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routers/*.js"],
}
const specs = swaggerJsdoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

app.listen(port, () => {
  console.log(`server run at port ${port}`)
})
