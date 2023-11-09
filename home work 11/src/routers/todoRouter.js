const router = require("express").Router()

const {
  findAllTodos,
  findById,
  createNewTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController")

router.get("/todos", findAllTodos)
router.get("/todos/:id", findById)
router.post("/todos", createNewTodo)
router.put("/todos/:id", updateTodo)
router.delete("/todos/:id", deleteTodo)

module.exports = router
