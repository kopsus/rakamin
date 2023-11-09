const express = require("express")
const router = express.Router()
const pool = require("../config/config.js")

//menampilkan list category
router.get("/", (req, res) => {
  const query = `
        SELECT
        *
        FROM category;
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

router.get("/:category_id", (req, res) => {
  const { category_id } = req.params

  const query = `
          SELECT
          *
          FROM category
          WHERE category_id = $1;
      `

  pool.query(query, [category_id], (err, result) => {
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
