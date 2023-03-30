const nedb = require("nedb-promises");
const database = new nedb({ filename: "todos.db", autoload: true });
const uuid = require("uuid-random");

async function getTodos() {
  return await database.find({});
}

async function addTodo(todo) {
  const todoObj = {
    todo: todo,
    id: uuid(),
    done: false,
  };

  return await database.insert(todoObj);
}

async function removeTodo(id) {
  const result = await database.remove({ id: id });

  if (result > 0) {
    return {
      success: true,
      todos: await getTodos(),
    };
  } else {
    return {
      success: false,
      message: "No todo found with that id",
    };
  }
}

module.exports = { getTodos, addTodo, removeTodo };
