const express = require("express")
const router = express.Router()
const pool = require("../config/db")
const authMiddleware = require("../middleware/verifyToken.js")

// movies.js
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Operasi terkait film
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         year:
 *           type: integer
 *     MovieInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         year:
 *           type: integer
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Dapatkan daftar film
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Batasi jumlah film yang akan diambil
 *     responses:
 *       '200':
 *         description: Respon berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Dapatkan film berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID film
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Respon berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '404':
 *         description: Film tidak ditemukan
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Tambahkan film baru
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       '201':
 *         description: Film berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '500':
 *         description: Kesalahan Server Internal
 */

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Perbarui film berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID film
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       '200':
 *         description: Film berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '404':
 *         description: Film tidak ditemukan
 *       '500':
 *         description: Kesalahan Server Internal
 */

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Hapus film berdasarkan ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID film
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Film berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '404':
 *         description: Film tidak ditemukan
 *       '500':
 *         description: Kesalahan Server Internal
 */

// GET dengan autentikasi token untuk menampilkan daftar film
router.get("/", (req, res) => {
  const limit = req.query.limit
  let query = "SELECT * FROM movies"

  if (limit) {
    query += ` LIMIT ${parseInt(limit)}` // Menambahkan LIMIT jika limit diberikan
  }

  pool.query(query, (error, result) => {
    if (error) {
      console.error("Error querying the database:", error)
      res.status(500).json("Internal Server Error")
    } else {
      res.json(result.rows)
    }
  })
})

// GET untuk menampilkan data film berdasarkan ID
router.get("/:id/:token", authMiddleware, async (req, res) => {
  const id = req.params.id
  pool.query(`SELECT * FROM movies WHERE id = $1`, [id], (err, result) => {
    if (err) {
      console.error("Error querying the database:", error)
      res.status(500).json("Internal Server Error")
    } else {
      if (result.rows.length > 0) {
        res.json(result.rows[0])
      } else {
        res.status(404).json("Not Found")
      }
    }
  })
})

// POST: Menambahkan data film baru
router.post("/:token", authMiddleware, async (req, res) => {
  const { id, title, genres, year } = req.body
  pool.query(
    `INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, title, genres, year],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).json({
          message: "Data berhasil dimasukkan ke dalam database",
          insertedData: result.rows[0],
        })
      }
    }
  )
})

// PUT: Memperbarui data film berdasarkan ID
router.put("/:id/:token", authMiddleware, (req, res) => {
  const id = req.params.id
  const { title, genres, year } = req.body
  pool.query(
    `UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *`,
    [title, genres, year, id],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json("Internal Server Error")
      } else {
        if (result.rows.length > 0) {
          res.status(200).json({
            message: "Data berhasil di update",
            data: result.rows[0],
          })
        } else {
          res.status(404).json("Data Not Found")
        }
      }
    }
  )
})

// DELETE: Menghapus data film berdasarkan ID
router.delete("/:id/:token", authMiddleware, (req, res) => {
  const id = req.params.id
  pool.query(
    `DELETE FROM movies WHERE id = $1 RETURNING *`,
    [id],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json("Internal Server Error")
      } else {
        if (result.rows.length > 0) {
          res.json({
            message: "Data berhasil dihapus",
            deletedFilm: result.rows[0],
          })
        } else {
          res.status(404).json("Not Found")
        }
      }
    }
  )
})

module.exports = router
