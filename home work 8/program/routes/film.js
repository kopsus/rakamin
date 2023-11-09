const express = require("express")
const router = express.Router()
const pool = require("../config/config.js")

//menampilkan seluruh list film
router.get("/", (req, res) => {
  const query = `
        SELECT
        *
        FROM film;
    `

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    } else {
      res.status(200).json(result.rows)
    }
  })
})

//menampilkan film berdasarkan id
router.get("/:film_id", (req, res) => {
  const { film_id } = req.params

  const query = `
        SELECT
        *
        FROM film
        WHERE film_id = $1;
    `

  pool.query(query, [film_id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: "Internal Server Error" })
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Author not found" })
      }
      res.status(200).json(result.rows[0])
    }
  })
})

module.exports = router
