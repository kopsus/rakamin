const express = require("express")
const router = express.Router()
const pool = require("../config/config.js")

router.get("/", (req, res) => {
  const query = `
          SELECT
          *
          FROM actor;
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

router.get("/:actor_id", (req, res) => {
  const { actor_id } = req.params

  const query = `
          SELECT
          *
          FROM actor
          WHERE actor_id = $1;
      `

  pool.query(query, [actor_id], (err, result) => {
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
