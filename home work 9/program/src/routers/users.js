const express = require("express")
const router = express.Router()
const pool = require("../config/db")
const { signToken } = require("../auth/auth.js")
const authMiddleware = require("../middleware/verifyToken")

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operasi terkait pengguna
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         gender:
 *           type: string
 *         role:
 *           type: string
 *     UserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         gender:
 *           type: string
 *         role:
 *           type: string
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Dapatkan daftar pengguna
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Batasi jumlah pengguna yang akan diambil
 *     responses:
 *       '200':
 *         description: Respon berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Kesalahan Server Internal
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '201':
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Permintaan tidak valid
 *       '500':
 *         description: Kesalahan Server Internal
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Masuk ke akun pengguna
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Masuk berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Kesalahan Server Internal
 */

// GET: Mengambil seluruh data user
router.get("/:token", authMiddleware, (req, res) => {
  const limit = req.query.limit

  let query = "SELECT * FROM users"

  if (limit) {
    query += ` LIMIT ${parseInt(limit)}`
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

// GET: Mengambil data user berdasarkan ID
router.get("/:id/:token", authMiddleware, (req, res) => {
  const id = req.params.id
  pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json("Internal Server Error")
    } else {
      if (result.rows.length > 0) {
        res.json(result.rows[0])
      } else {
        res.status(404).json("User Not Found")
      }
    }
  })
})

router.post("/login", (req, res) => {
  const { email, password } = req.body
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (error, result) => {
      if (error) {
        console.error("Database error:", error)
        return res.status(500).json({ message: "Internal Server Error" })
      } else if (result.rows.length === 0) {
        console.error("User not found for email:", email)
        res.status(401).json({ message: "Unauthorized: User not found" })
      }

      // Check password without bcrypt.compare
      const user = result.rows[0]
      if (password !== user.password) {
        console.error("Password mismatch for email:", email)
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid password" })
      }

      const token = signToken({ email: user.email, role: user.role })
      if (!token) {
        console.error("Error generating token for email:", email)
        return res
          .status(500)
          .json({ message: "Internal Server Error: Token generation failed" })
      }

      res.json({ token: token })
    }
  )
})

router.post("/register", async (req, res) => {
  const { id, email, password, gender, role } = req.body

  pool.query(
    `SELECT Email FROM users WHERE email = $1`,
    [email],
    (err, result) => {
      if (err) {
        console.error("Error querying the database:", err)
        res.status(500).json("Internal Server Error")
      } else if (result.rows.length > 0) {
        res.status(400).json({ message: "Email already exist" })
      } else {
        pool.query(
          `INSERT INTO users (id, email, password, gender, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, gender, role`,
          [id, email, password, gender, role],
          (err, result) => {
            if (err) {
              console.error("Error querying the database:", err)
              res.status(500).json("Internal Server Error")
            } else {
              res.status(201).json(result.rows[0])
            }
          }
        )
      }
    }
  )
})

module.exports = router
