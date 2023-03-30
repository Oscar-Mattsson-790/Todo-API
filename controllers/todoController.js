const { getTodos, addTodo, removeTodo } = require("../model/todo");

async function get(request, response) {
  const todos = await getTodos();

  response.json({ success: true, todos: todos });
}

async function add(request, response) {
  const { todo } = request.body;

  await addTodo(todo);

  const todos = await getTodos();

  const result = {
    success: true,
    todos: todos,
  };

  response.json(result);
}

async function remove(request, response) {
  const id = request.params.id;

  const result = await removeTodo(id);

  response.json(result);
}

module.exports = { get, add, remove };
