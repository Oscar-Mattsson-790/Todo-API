const { Router } = require("express");
const router = Router();
const uuid = require("uuid-random");

/**
 * Hämta alla todos
 * URL: /api/todo
 * Method: GET
 *
 * Lägga till en todo
 * URL: /api/todo
 * Method: POST
 * body: {
 *  username: Ada
 *  password: pwd123
 * }
 *
 * Ta bort en todo
 * URL: /api/todo/:id
 * Method: DELETE
 */

const { checkBody, checkParams } = require("../middleware/index");

let todos = [
  { todo: "Köp kaffe", id: uuid(), done: false },
  { todo: "Köp kaka", id: uuid(), done: false },
  { todo: "Brygg kaffe", id: uuid(), done: false },
  { todo: "Drick kaffe", id: uuid(), done: false },
];

router.get("/", (request, response) => {
  response.json({ success: true, todos: todos });
});

router.post("/", checkBody, (request, response) => {
  const { todo } = request.body;

  const todoObj = {
    todo: todo,
    id: uuid(),
    done: false,
  };

  todos.push(todoObj);

  const result = {
    success: true,
    todos: todos,
  };

  response.json(result);
});

router.delete("/:id", checkParams, (request, response) => {
  const id = request.params.id;

  todos = todos.filter((todo) => {
    if (todo.id !== id) {
      return todo;
    }
  });

  const result = {
    success: true,
    todos: todos,
  };

  response.json(result);
});

module.exports = router;
