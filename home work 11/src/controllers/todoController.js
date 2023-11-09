const { todo } = require("../models")

const findAllTodos = async (req, res) => {
  try {
    const data = await todo.findAll()

    const result = {
      status: "ok",
      data: data,
    }
    res.json(result)
  } catch (err) {
    console.error(err)
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await todo.findByPk(id)

    if (data === null) {
      return res.status(404).json({
        status: "failed",
        data: `Data todo with id ${id} is not found`,
      })
    }

    res.status(200).json({ status: "ok", data: data })
  } catch (err) {
    console.error(err)
  }
}

const createNewTodo = async (req, res) => {
  try {
    const { title } = req.body
    const newTodo = await todo.create({ title: title })

    res.status(201).json({
      status: "ok",
      data: {
        id: newTodo.id,
        title: newTodo.title,
        createAt: newTodo.createAt,
        updateAt: newTodo.updateAt,
      },
    })
  } catch (err) {
    console.error(err)
  }
}

const updateTodo = async (req, res) => {
  try {
    // daparkan id nya
    const { id } = req.params
    const { title } = req.body
    const updateTodo = await todo.findByPk(id)

    if (!updateTodo) {
      return res.status(404).json({
        status: "failed",
        data: `Data todo with id ${id} is not found`,
      })
    }

    updateTodo.title = title
    updateTodo.updateAt = new Date()
    updateTodo.save()

    res.status(200).json({
      status: "ok",
      data: {
        id: updateTodo.id,
        title: updateTodo.title,
        createAt: updateTodo.createAt,
        updateAt: updateTodo.updateAt,
      },
    })
  } catch (err) {
    console.error(err)
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await todo.findByPk(id)

    if (!deleteTodo) {
      return res.status(404).json({
        status: "Ok",
        data: `Data todo with id ${id} is not found`,
      })
    }

    deleteTodo.destroy()

    res
      .status(200)
      .json({ status: "Ok", message: `Success delete todo with id ${id}` })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  findAllTodos,
  findById,
  createNewTodo,
  updateTodo,
  deleteTodo,
}
